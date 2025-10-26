import { Title1, Title2, Title3, SubTitle } from "@components/typography";
import { View } from "@components/view";
import { useEffect, useState } from "react";
import TicketService from "@services/ticket";
import UserTicketService from "@services/user-ticket";
import { Kanban } from "@components/kanban";
import { Loading } from "@components/loading";
import { WeekCalendar } from "@components/week-calendar";
import { useParams } from "react-router-dom";
import { useLoggedUser } from "@contexts/UserContext";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export function TicketIndex() {
  const { viewType } = useParams();
  const { loggedUser } = useLoggedUser();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isWeekView, setIsWeekView] = useState(false);
  const [value, setValue] = useState(dayjs());
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    const loadTickets = async () => {
      setLoading(true);
      try {
        console.log("Fetching tickets for viewType:", viewType);
        let response;
        if (viewType === "all") {
          response = await TicketService.getAll();
        } else {
          response = await UserTicketService.getByUserId(loggedUser.id);
        }

        console.log("Tickets fetched:", response.data);
        setTickets(response.data);
        setFilteredTickets(response.data);
      } catch (error) {
        setTickets([]);
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    };
    setIsWeekView(loggedUser?.role_name === "Technician" && viewType !== "all");
    loadTickets();
  }, [loggedUser, viewType]);

  // Filter tickets when week selection changes or week view is toggled
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
      // If week view is off, show all tickets
      setFilteredTickets(tickets);
    }
  }, [value, isWeekView, tickets]);

  if (loading) return <Loading />;

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
        <Title1>Available Tickets</Title1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SubTitle bold={true}>Week Calendar</SubTitle>
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
          <Title2>You don't have registered Tickets</Title2>
          {loggedUser?.role_name === "Client" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Title3>Create a new ticket</Title3>
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
                Here
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
