import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate, formatTime } from "@utils/date-manager";

import {
  Card,
  CardContent,
  Paper,
  Typography,
  Box,
  Divider,
  Chip,
  Rating,
} from "@mui/material";
import TicketService from "@services/ticket";
import StatusService from "@services/status";
import CategoryService from "@services/category";
import PriorityService from "@services/priority";
import TicketLabelService from "@services/ticket-label";
import TimelineService from "@services/timeline";
import UserTicketService from "@services/user-ticket";
import { Loading } from "@components/loading";
import Table from "@components/table";
import ImageDialog from "@components/image-dialog";
import {
  SubTitle,
  SubTitle2,
  Body2,
  Title2,
  Title3,
} from "@components/typography.jsx";
import IconButton from "@mui/material/IconButton";
import {
  getSlaStatusIcon,
  calculateResolutionDays,
  calculateSlaResolution,
  calculateSlaResponse,
} from "@utils/sla-manager";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export function TicketDetail() {
  const { id } = useParams();
  const ticketId = id ? parseInt(id) : 1;

  const [ticket, setTicket] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatusest] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [labels, setLabels] = useState([]);
  const [timeline, setTimeline] = useState([]);

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

        const [statusRes, priorityRes, categoryRes, labelRes] =
          await Promise.all([
            StatusService.getAll(),
            PriorityService.getAll(),
            CategoryService.getAll(),
            TicketLabelService.getAll(),
          ]);
        setStatusest(statusRes.data);
        setPriorities(priorityRes.data);
        setCategories(categoryRes.data);
        setLabels(labelRes.data);

        const timelineRes = await TimelineService.getAllByTicketId(ticketId);
        setTimeline(timelineRes.data);

        const userTicketRes = await UserTicketService.getByTicketId(ticketId);
        setAssignedUsers(userTicketRes.data);
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

    const assignedOn = assignedUsers.filter(
      (u) => u.user_role === "Technician"
    )[0].assigned_on;

    const responseSLA = calculateSlaResponse(
      ticket.created_on,
      assignedOn,
      ticket.response_time
    );

    const resolutionSLA = calculateSlaResolution(
      ticket.created_on,
      ticket.notified_on,
      ticket.resolution_time
    );

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
    <>
      <ImageDialog
        open={imageDialogManager.open}
        onClose={() =>
          setImageDialogManager({ ...imageDialogManager, open: false })
        }
        data={imageDialogManager.data}
        dialogTitle={`Ticket #${ticket.id} | ${ticket.title}`}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="start"
        flexDirection="column"
        minHeight="80vh"
        sx={{ backgroundColor: "background.default", p: 2 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            maxwidth: 700,
            width: "100%",
            backgroundColor: "background.paper",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Title2 color="primary.main" bold>
              Ticket #{ticket.id} | {ticket.title}
            </Title2>
            <SubTitle bold>
              {ticket.status_name !== "Resolved" ? (
                getSlaStatusIcon(ticket.created_on, ticket.resolution_time)
              ) : (
                <IconButton size="large" edge="start">
                  <TaskAltIcon />
                </IconButton>
              )}
            </SubTitle>
          </Box>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Title3>Status</Title3>
                  <Chip
                    label={getName(statuses, ticket.status_id)}
                    sx={{ color: "white", backgroundColor: "#8b293b" }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Title3>Priority</Title3>
                  <Chip
                    label={getName(priorities, ticket.priority_id)}
                    color="warning"
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Title3>Category</Title3>
                  <Chip
                    label={getName(categories, ticket.category_id)}
                    color="secondary"
                  />
                </Box>
                {ticket.label_id && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Title3>Label</Title3>
                    <Chip
                      label={getName(labels, ticket.label_id)}
                      color="success"
                    />
                  </Box>
                )}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Description:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-line",
                  backgroundColor: "#f9f9f9",
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid #eee",
                }}
              >
                {ticket.description}
              </Typography>
              <br />
              {ticket.rating && ticket.rating != 0 && (
                <>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Rating:
                  </Typography>
                  <Rating
                    name="size-large"
                    defaultValue={ticket.rating}
                    size="large"
                    readOnly
                  />
                </>
              )}
              {ticket.comment && (
                <>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Comments:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-line",
                      backgroundColor: "#f9f9f9",
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid #eee",
                    }}
                  >
                    {ticket.comment}
                  </Typography>
                </>
              )}
              <Divider sx={{ my: 2 }} />
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
                    {assignedUsers.filter(
                      (u) => u.user_role === "Technician"
                    )[0]?.user_name || "Unassigned"}
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
                  <SubTitle2 color="text.secondary" alignment="end" bold>
                    Days of resolution
                  </SubTitle2>
                  <Body2 alignment="end">{slaProps.resolution_days}</Body2>
                  <SubTitle2 color="text.secondary" alignment="end" bold>
                    SLA Response Time
                  </SubTitle2>
                  <Body2 alignment="end">{slaProps.response_time}</Body2>
                  <Body2 alignment="end">{slaProps.compliance_response}</Body2>
                  <SubTitle2 color="text.secondary" alignment="end" bold>
                    SLA Resolution Time
                  </SubTitle2>
                  <Body2 alignment="end">{slaProps.resolution_time}</Body2>
                  <Body2 alignment="end">
                    {slaProps.compliance_resolution}
                  </Body2>
                </Box>
              </Box>
            </CardContent>
          </Card>
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
            hasPagination={false}
            dense={true}
          />
        </Paper>
      </Box>
    </>
  );
}
