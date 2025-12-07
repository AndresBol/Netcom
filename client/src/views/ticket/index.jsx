import { Title1, Title2, Title3, SubTitle } from "@components/typography";
import { View } from "@components/view";
import { useEffect, useState } from "react";
import TicketService from "@services/ticket";
import UserTicketService from "@services/user-ticket";
import UserService from "@services/user";
import { Kanban } from "@components/kanban";
import { Loading } from "@components/loading";
import { WeekCalendar } from "@components/week-calendar";
import { useParams } from "react-router-dom";
import { useLoggedUser } from "@components/user/user-provider.jsx";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { BackButton } from "@components/backbutton";
import StatusService from "@services/status";
import { useTranslation } from "react-i18next";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";

dayjs.extend(isBetween);

const CLOSED_TICKET_STATUSES = new Set(["resolved", "closed"]);

export function TicketIndex() {
  const { viewType } = useParams();
  const { loggedUser } = useLoggedUser();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isWeekView, setIsWeekView] = useState(false);
  const [value, setValue] = useState(dayjs());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [autoAssignLoading, setAutoAssignLoading] = useState(false);

  const userRole = (loggedUser?.role || "").toLowerCase();
  const isTechnician = userRole === "technician";
  const isClient = userRole === "client";
  const isAdmin = userRole === "administrator";
  const isByUserView = viewType === "by-user";

  const normalizeTickets = (raw) => (Array.isArray(raw) ? raw : []);
  const dropClosedTicketsForTechnician = (ticketList) => {
    if (!isTechnician || !isByUserView) return ticketList;
    return ticketList.filter((ticket) => {
      const status = (ticket?.status_name || "").toLowerCase();
      return !CLOSED_TICKET_STATUSES.has(status);
    });
  };
  const prepareTickets = (raw) =>
    dropClosedTicketsForTechnician(normalizeTickets(raw));

  const loadTickets = async () => {
    if (!loggedUser) {
      setTickets([]);
      setFilteredTickets([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log("Fetching tickets for viewType:", viewType);
      let response;
      if (!isClient && viewType === "all") {
        response = await TicketService.getAll();
      } else if (isAdmin && viewType === "pending") {
        response = await TicketService.getByStatusName("Pending");
      } else {
        response = await UserTicketService.getByUserId(loggedUser.id);
      }

      const preparedTickets = prepareTickets(response?.data);
      console.log("Tickets fetched:", preparedTickets);

      setTickets(preparedTickets);
      setFilteredTickets(preparedTickets);
    } catch (error) {
      setTickets([]);
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedUser) return;
    setIsWeekView(isTechnician && viewType !== "all");
    loadTickets();
  }, [isTechnician, loggedUser, viewType]);

  useEffect(() => {
    if (isWeekView && value) {
      const weekStart = value.startOf("week");
      const weekEnd = value.endOf("week");

      const filtered = tickets.filter((ticket) => {
        if (!ticket.created_on) return false;

        const ticketDate = dayjs(ticket.created_on);
        return ticketDate.isBetween(weekStart, weekEnd, null, "[]");
      });

      setFilteredTickets(filtered);
      console.log("Filtered tickets for week:", filtered);
    } else {
      setFilteredTickets(tickets);
    }
  }, [value, isWeekView, tickets]);

  if (loading) return <Loading />;

  async function autoAssign(tickets) {
    console.log("Auto-assigning tickets:", tickets);
    setAutoAssignLoading(true);
    let assignedCount = 0;
    let failedCount = 0;
    const noTechnicianTickets = [];

    try {
      const statusResponse = await StatusService.getAll();
      const statuses = statusResponse?.data || [];
      const assignedStatus = statuses.find((s) => s.name === "Assigned");

      if (!assignedStatus) {
        toast.error(t("messages.autoAssignNoAssignedStatus"));
        setAutoAssignLoading(false);
        return;
      }

      // Fetch technicians with workload
      const techResponse = await UserService.getTechniciansWorkload();
      const allTechnicians = (techResponse?.data || []).filter(
        (tech) => (tech.availability || "").toLowerCase() === "available"
      );

      if (!allTechnicians || allTechnicians.length === 0) {
        toast.error(t("messages.autoAssignNoTechniciansAvailable"));
        setAutoAssignLoading(false);
        return;
      }

      const workload = {};
      // Sort tickets by score descending (higher priority first)
      const sortedTickets = [...tickets].sort((a, b) => {
        const scoreA = Number(a.priority_id) * 1000 - Number(a.response_time);
        const scoreB = Number(b.priority_id) * 1000 - Number(b.response_time);
        return scoreB - scoreA;
      });

      for (const ticket of sortedTickets) {
        try {
          let users = allTechnicians.filter((user) => {
            if (!user.special_fields || !ticket.category_id) return false;
            for (const field of user.special_fields) {
              if (field.category_id === ticket.category_id) {
                return true;
              }
            }
            return false;
          });

          // Sort users by workload ascending
          users.sort((a, b) => (a.workload || 0) - (b.workload || 0));

          if (users.length > 0) {
            const technician = users[0];
            await UserTicketService.insert({
              user_id: technician.id,
              ticket_id: ticket.id,
              assigned_by: null,
            });

            // Update ticket status to Assigned
            await TicketService.update({
              ...ticket,
              status_id: assignedStatus.id,
            });

            // Update workload
            workload[technician.id] = (workload[technician.id] || 0) + 1;
            assignedCount++;

            toast.success(
              t("messages.ticketAutoAssigned", {
                ticketId: ticket.id,
                technicianName: technician.name,
              })
            );
          } else {
            noTechnicianTickets.push(ticket.id);
            failedCount++;
          }
        } catch (error) {
          failedCount++;
          console.error(
            `Error assigning ticket ${ticket.id}:`,
            error.response?.data || error
          );
        }
      }

      await loadTickets();

      if (assignedCount === 0 && failedCount > 0) {
        if (noTechnicianTickets.length > 0) {
          toast.error(
            t("messages.autoAssignNoTechniciansForTickets", {
              tickets: noTechnicianTickets.join(", "),
            })
          );
        } else {
          toast.error(
            t("messages.autoAssignPartialError") + ` (${failedCount} failed)`
          );
        }
      } else if (failedCount > 0) {
        if (noTechnicianTickets.length > 0) {
          toast.error(
            t("messages.autoAssignPartialErrorWithDetails", {
              assigned: assignedCount,
              failed: failedCount,
              tickets: noTechnicianTickets.join(", "),
            })
          );
        } else {
          toast.error(
            t("messages.autoAssignPartialError") +
              ` (${assignedCount} assigned, ${failedCount} failed)`
          );
        }
      } else if (assignedCount > 0) {
        toast.success(
          t("messages.autoAssignCompleted") + ` (${assignedCount} assigned)`
        );
      }
    } catch (error) {
      console.error("Error in autoAssign:", error.response?.data || error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Auto-assignment failed";
      toast.error(
        t("messages.autoAssignError", {
          defaultValue: errorMessage,
        })
      );
    } finally {
      setAutoAssignLoading(false);
    }
  }

  return (
    <View styles={styles.MainView}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title1>{t("ticket.title")}</Title1>
          {isAdmin && viewType === "pending" && (
            <Button
              variant="contained"
              size="small"
              startIcon={
                autoAssignLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <AutoModeIcon />
                )
              }
              disabled={autoAssignLoading}
              onClick={async () => await autoAssign(filteredTickets)}
            >
              {t("ticket.autoAssign")}
            </Button>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SubTitle bold={true}>{t("ticket.weekCalendar")}</SubTitle>
          <Switch
            checked={isWeekView}
            onChange={() => setIsWeekView(!isWeekView)}
            slotProps={{ input: { "aria-label": "weekView" } }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />
      {tickets.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Title2>{t("ticket.noTickets")}</Title2>
          {isClient && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Title3>{t("ticket.createTicket")}</Title3>
              <Button
                href="/ticket/new"
                variant="contained"
                sx={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <PostAddIcon />
                {t("common.here")}
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          {filteredTickets.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
                flex: 1,
              }}
            >
              <Title2>There are no registered Tickets in this week</Title2>
            </Box>
          ) : (
            <Kanban data={filteredTickets} model="ticket" />
          )}

          {isWeekView && (
            <Box>
              <WeekCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
                hoveredDay={hoveredDay}
                onHoveredDayChange={setHoveredDay}
              />
            </Box>
          )}
        </Box>
      )}
      <BackButton />
    </View>
  );
}

const styles = {
  MainView: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 2,
    bottomShadow: 2,
    p: 2,
  },
};
