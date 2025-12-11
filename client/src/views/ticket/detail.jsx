import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate, formatTime } from "@utils/date-manager";
import { BackButton } from "@components/backbutton";

import { Typography, Box, Divider } from "@mui/material";
import TicketService from "@services/ticket";
import TimelineService from "@services/timeline";
import UserTicketService from "@services/user-ticket";
import { Loading } from "@components/loading";
import Table from "@components/table";
import ImageDialog from "@components/image-dialog";
import { SubTitle2, Body2, Title3 } from "@components/typography.jsx";
import {
  calculateResolutionDays,
  calculateSlaResolution,
  calculateSlaResponse,
} from "@utils/sla-manager";
import { View } from "@components/view";
import { TicketManager } from "@components/managers/ticket";
import { TimelineManager } from "@components/managers/timeline";
import ManagerDialog from "@components/manager-dialog";
import { UserTicketManager } from "@components/managers/user-ticket";
import { useLoggedUser } from "@components/user/user-provider.jsx";
import { calculateRemainingTime } from "@utils/sla-manager";
import { useTranslation } from "react-i18next";

export function TicketDetail() {
  const { loggedUser } = useLoggedUser();
  const { id } = useParams();
  const parsedTicketId = Number(id);
  const ticketId =
    Number.isInteger(parsedTicketId) && parsedTicketId > 0
      ? parsedTicketId
      : null;
  const { t } = useTranslation();

  const [ticket, setTicket] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);
  const [assignedOn, setAssignedOn] = useState(null);

  const [slaProps, setSlaProps] = useState({
    resolution_days: null,
    response_time: null,
    compliance_response: null,
    resolution_time: null,
    compliance_resolution: null,
  });

  const [imageDialogManager, setImageDialogManager] = useState({
    open: false,
    data: null,
  });

  const [managerDialog, setManagerDialog] = useState({
    model: null,
    data: null,
  });

  const timelineTableHeadTitles = [
    { label: t("fields.subject"), fieldName: "subject", fieldType: "string" },
    {
      label: t("fields.user"),
      fieldName: "user_name",
      fieldType: "string",
    },
    {
      label: t("fields.description"),
      fieldName: "description",
      fieldType: "string",
    },
    { label: t("fields.date"), fieldName: "date", fieldType: "dateTime" },
    {
      label: t("fields.attachments"),
      fieldName: "ticket_attachments",
      fieldType: "actionButton",
    },
  ];

  const assignedUsersTableHeadTitles = [
    {
      label: t("fields.userName"),
      fieldName: "user_name",
      fieldType: "string",
    },
    {
      label: t("fields.userRole"),
      fieldName: "user_role",
      fieldType: "string",
    },
    {
      label: t("fields.assignedOn"),
      fieldName: "assigned_on",
      fieldType: "dateTime",
    },
    {
      label: t("fields.assignedBy"),
      fieldName: "assigned_by_name",
      fieldType: "string",
    },
  ];

  const fetchData = async () => {
    if (!ticketId) {
      setLoading(false);
      return;
    }
    try {
      const ticketRes = await TicketService.getById(ticketId);
      setTicket(ticketRes.data);

      const userTicketRes = await UserTicketService.getByTicketId(ticketId);
      const processedAssignedUsers = userTicketRes.data
        .map((user) => ({
          ...user,
          assigned_by_name: user.assigned_by_name || t("ticket.system"),
        }))
        .sort((a, b) => new Date(a.assigned_on) - new Date(b.assigned_on));
      setAssignedUsers(processedAssignedUsers);

      const timelineRes = await TimelineService.getAllByTicketId(ticketId);
      setTimeline(timelineRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTicket = async () => {
    if (!ticketId) return;
    try {
      const ticketRes = await TicketService.getById(ticketId);
      setTicket(ticketRes.data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };

  const updateSlaProps = (ticketData, assignedUsersData) => {
    if (assignedUsersData.length === 0 || !ticketData) return;

    const techUser = assignedUsersData.find(
      (u) => u.user_role === "Technician"
    );
    const assignedOnValue = techUser ? techUser.assigned_on : null;
    setAssignedOn(assignedOnValue);

    const now = new Date();
    const createdOn = new Date(ticketData.created_on);
    const elapsedMinutes = (now - createdOn) / (1000 * 60);

    // For Response SLA: Use assignedOnValue if available,
    // otherwise use current date if SLA is breached to show the breach
    let responseDate = assignedOnValue;
    if (
      !responseDate &&
      ticketData.response_time &&
      elapsedMinutes > ticketData.response_time
    ) {
      responseDate = now.toISOString();
    }

    let responseSLA = calculateSlaResponse(
      ticketData.created_on,
      responseDate,
      ticketData.response_time,
      t
    );
    if (responseSLA === undefined) {
      responseSLA = {
        actualTime: calculateRemainingTime(ticketData.response_time, t),
      };
    }

    // For Resolution SLA: Use notified_on if available,
    // otherwise use current date if SLA is breached to show the breach
    let resolutionDate = ticketData.notified_on;
    if (
      !resolutionDate &&
      ticketData.resolution_time &&
      elapsedMinutes > ticketData.resolution_time
    ) {
      resolutionDate = now.toISOString();
    }

    let resolutionSLA = calculateSlaResolution(
      ticketData.created_on,
      resolutionDate,
      ticketData.resolution_time,
      t
    );
    if (resolutionSLA === undefined) {
      resolutionSLA = {
        actualTime: calculateRemainingTime(ticketData.resolution_time, t),
      };
    }

    setSlaProps({
      resolution_days: calculateResolutionDays(
        ticketData.created_on,
        ticketData.notified_on
      ),
      response_time: responseSLA.actualTime,
      compliance_response: responseSLA.isCompliant,
      resolution_time: resolutionSLA.actualTime,
      compliance_resolution: resolutionSLA.isCompliant,
    });
  };

  useEffect(() => {
    if (!ticketId) {
      setLoading(false);
      return;
    }
    fetchData();
  }, [ticketId]);

  useEffect(() => {
    if (assignedUsers.length === 0 || !ticket) return;
    updateSlaProps(ticket, assignedUsers);
  }, [assignedUsers, ticket]);

  if (loading) return <Loading />;
  if (!ticketId)
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        {t("ticketDetail.ticketNotFound")}
      </Typography>
    );
  if (!ticket)
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        {t("ticketDetail.ticketNotFound")}
      </Typography>
    );

  const getName = (list, id) => list.find((item) => item.id === id)?.name || id;

  return (
    <View>
      <ImageDialog
        open={imageDialogManager.open}
        onClose={() =>
          setImageDialogManager({ ...imageDialogManager, open: false })
        }
        data={imageDialogManager.data}
        dialogTitle={`Ticket #${ticket.id} | ${ticket.title}`}
      />
      <ManagerDialog
        open={managerDialog.model !== null}
        onClose={() => setManagerDialog({ model: null, data: null })}
      >
        {managerDialog.model === "timeline" && (
          <TimelineManager
            ticketId={ticket.id}
            userId={loggedUser.id}
            onSaved={async (newTimelineEntry) => {
              setManagerDialog({ model: null, data: null });
              await fetchData();
              await fetchTicket();
              // Refresh SLA requirements after timeline submission
              const ticketRes = await TicketService.getById(ticketId);
              updateSlaProps(ticketRes.data, assignedUsers);
            }}
          />
        )}
        {managerDialog.model === "user-ticket" && (
          <UserTicketManager
            record={managerDialog.data}
            ticketId={ticket.id}
            onSuccess={() => {
              setManagerDialog({ model: null, data: null });
              fetchData();
            }}
          />
        )}
      </ManagerDialog>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "stretch",
          mb: 2,
        }}
      >
        <TicketManager
          key={ticket?.status_id}
          record={ticket}
          onAfterSubmit={() => fetchData()}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "stretch",
            marginTop: 11,
            gap: 5,
          }}
        >
          <Table
            data={assignedUsers}
            headTitles={assignedUsersTableHeadTitles}
            tableTitle={t("ticketDetail.assignedUsers")}
            onRowClick={
              loggedUser?.role === "Administrator"
                ? (row) => setManagerDialog({ model: "user-ticket", data: row })
                : undefined
            }
            onAddButtonClick={
              loggedUser?.role === "Administrator"
                ? () => setManagerDialog({ model: "user-ticket", data: null })
                : undefined
            }
            hasPagination={false}
            dense={true}
          />
          <Box>
            <Box sx={{ p: 1 }}>
              <Title3 color="text.secondary" bold>
                {t("ticketDetail.slaRequirements")}
              </Title3>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "start",
                p: 1,
              }}
            >
              <Box>
                <SubTitle2 color="text.secondary" bold>
                  {t("ticketDetail.assignedTo")}
                </SubTitle2>
                <Body2>
                  {assignedUsers.filter((u) => u.user_role === "Technician")[0]
                    ?.user_name || t("ticketDetail.unassigned")}
                </Body2>
                <SubTitle2 color="text.secondary" bold>
                  {t("ticketDetail.assignedOn")}
                </SubTitle2>
                <Body2>
                  {assignedOn
                    ? `${formatDate(assignedOn, "en-US")} ${formatTime(assignedOn, "en-US")}`
                    : "Unassigned"}
                </Body2>

                <SubTitle2 color="text.secondary" bold>
                  {t("ticketDetail.createdBy")}
                </SubTitle2>
                <Body2>
                  {assignedUsers.sort((a, b) => a.id - b.id)[0]?.user_name ||
                    t("ticketDetail.unassigned")}
                </Body2>
                <SubTitle2 color="text.secondary" bold>
                  {t("ticketDetail.createdAt")}
                </SubTitle2>
                <Body2>
                  {formatDate(ticket.created_on, "en-US")}{" "}
                  {formatTime(ticket.created_on, "en-US")}
                </Body2>
              </Box>
              <Box>
                {slaProps.resolution_days ? (
                  <>
                    <SubTitle2 color="text.secondary" alignment="end" bold>
                      {t("ticketDetail.daysOfResolution")}
                    </SubTitle2>
                    <Body2 alignment="end">{slaProps.resolution_days}</Body2>
                  </>
                ) : undefined}
                <SubTitle2 color="text.secondary" alignment="end" bold>
                  {t("ticketDetail.slaResponseTime")}
                </SubTitle2>
                <Body2 alignment="end">{slaProps.response_time}</Body2>
                <Body2 alignment="end">{slaProps.compliance_response}</Body2>
                <SubTitle2 color="text.secondary" alignment="end" bold>
                  {t("ticketDetail.slaResolutionTime")}
                </SubTitle2>
                <Body2 alignment="end">{slaProps.resolution_time}</Body2>
                <Body2 alignment="end">{slaProps.compliance_resolution}</Body2>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Table
        data={timeline}
        headTitles={timelineTableHeadTitles}
        tableTitle={t("ticketDetail.timeline")}
        onActionButtonClick={(row) => {
          console.log("Row:", row);
          setImageDialogManager({
            open: true,
            data: row.ticket_attachments,
          });
        }}
        onAddButtonClick={
          loggedUser?.role !== "Client" && ticket.status_name !== "Pending"
            ? () => setManagerDialog({ model: "timeline", data: null })
            : undefined
        }
        hasPagination={false}
        dense={true}
      />
      <BackButton />
    </View>
  );
}
