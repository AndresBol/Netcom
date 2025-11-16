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
import { useLoggedUser } from "@contexts/UserContext";
import { calculateRemainingTime } from "@utils/sla-manager";

export function TicketDetail() {
  const { loggedUser } = useLoggedUser();
  const { id } = useParams();
  const ticketId = id ? parseInt(id) : 1;

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

  const [isManagerDialogOpen, setIsManagerDialogOpen] = useState(false);

  const timelineTableHeadTitles = [
    { label: "Subject", fieldName: "subject", fieldType: "string" },
    { label: "Description", fieldName: "description", fieldType: "string" },
    { label: "Date", fieldName: "date", fieldType: "dateTime" },
    {
      label: "Attachments",
      fieldName: "ticket_attachments",
      fieldType: "actionButton",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketRes = await TicketService.getById(ticketId);
        setTicket(ticketRes.data);

        const userTicketRes = await UserTicketService.getByTicketId(ticketId);
        setAssignedUsers(userTicketRes.data);

        const timelineRes = await TimelineService.getAllByTicketId(ticketId);
        setTimeline(timelineRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ticketId]);

  useEffect(() => {
    if (assignedUsers.length === 0 || !ticket) return;

    const techUser = assignedUsers.find((u) => u.user_role === "Technician");
    const assignedOnValue = techUser ? techUser.assigned_on : null;
    setAssignedOn(assignedOnValue);

    let responseSLA = calculateSlaResponse(
      ticket.created_on,
      assignedOnValue,
      ticket.response_time
    );
    if (responseSLA === undefined) {
      responseSLA = {
        actualTime: calculateRemainingTime(ticket.response_time),
      };
    }

    let resolutionSLA = calculateSlaResolution(
      ticket.created_on,
      ticket.notified_on,
      ticket.resolution_time
    );
    if (resolutionSLA === undefined) {
      resolutionSLA = {
        actualTime: calculateRemainingTime(ticket.resolution_time),
      };
    }

    setSlaProps({
      resolution_days: calculateResolutionDays(
        ticket.created_on,
        ticket.notified_on
      ),
      response_time: responseSLA.actualTime,
      compliance_response: responseSLA.isCompliant,
      resolution_time: resolutionSLA.actualTime,
      compliance_resolution: resolutionSLA.isCompliant,
    });
  }, [assignedUsers]);

  if (loading) return <Loading />;
  if (!ticket)
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Ticket not found
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
        open={isManagerDialogOpen}
        onClose={() => setIsManagerDialogOpen(false)}
      >
        <TimelineManager ticketId={ticket.id} userId={loggedUser.id} />
      </ManagerDialog>
      <TicketManager record={ticket} />
      <Divider sx={{ my: 2 }} />
      <Box sx={{ p: 1 }}>
        <Title3 color="text.secondary" bold>
          SLA Requirements:
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
            Assigned To:
          </SubTitle2>
          <Body2>
            {assignedUsers.filter((u) => u.user_role === "Technician")[0]
              ?.user_name || "Unassigned"}
          </Body2>
          <SubTitle2 color="text.secondary" bold>
            Assigned On:
          </SubTitle2>
          <Body2>
            {assignedOn
              ? `${formatDate(assignedOn, "en-US")} ${formatTime(assignedOn, "en-US")}`
              : "Unassigned"}
          </Body2>

          <SubTitle2 color="text.secondary" bold>
            Created By:
          </SubTitle2>
          <Body2>
            {assignedUsers.filter((u) => u.user_role === "Client")[0]
              ?.user_name || "Unassigned"}
          </Body2>
          <SubTitle2 color="text.secondary" bold>
            Created At:
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
                Days of resolution
              </SubTitle2>
              <Body2 alignment="end">{slaProps.resolution_days}</Body2>
            </>
          ) : undefined}
          <SubTitle2 color="text.secondary" alignment="end" bold>
            SLA Response Time
          </SubTitle2>
          <Body2 alignment="end">{slaProps.response_time}</Body2>
          <Body2 alignment="end">{slaProps.compliance_response}</Body2>
          <SubTitle2 color="text.secondary" alignment="end" bold>
            SLA Resolution Time
          </SubTitle2>
          <Body2 alignment="end">{slaProps.resolution_time}</Body2>
          <Body2 alignment="end">{slaProps.compliance_resolution}</Body2>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Table
        data={timeline}
        headTitles={timelineTableHeadTitles}
        tableTitle={"Timeline"}
        onActionButtonClick={(row) => {
          console.log("Row:", row);
          setImageDialogManager({
            open: true,
            data: row.ticket_attachments,
          });
        }}
        onAddButtonClick={
          loggedUser?.role !== "Client"
            ? () => setIsManagerDialogOpen(true)
            : undefined
        }
        hasPagination={false}
        dense={true}
      />
      <BackButton />
    </View>
  );
}
