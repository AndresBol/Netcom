import { Title1, Title2, Title3 } from "@components/typography";
import { View } from "@components/view";
import { useEffect, useState } from "react";
import TicketService from "@services/ticket";
import UserTicketService from "@services/user-ticket";
import { Kanban } from "@components/kanban";
import { Loading } from "@components/loading";
import { useParams } from "react-router-dom";
import { useLoggedUser } from "@contexts/UserContext";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import PostAddIcon from "@mui/icons-material/PostAdd";

export function TicketIndex() {
  const { viewType } = useParams();
  const { loggedUser } = useLoggedUser();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  const fetchModels = async () => {
    //Fetch Tickets
    console.log("Fetching tickets for viewType:", viewType);
    let response;
    if (viewType === "all") {
      response = await TicketService.getAll();
    } else {
      response = await UserTicketService.getByUserId(loggedUser.id);
    }
    setTickets(response.data);

    console.log("Tickets fetched:", response.data);
  };

  useEffect(() => {
    const loadTickets = async () => {
      setLoading(true);
      try {
        await fetchModels();
      } catch (error) {
        setTickets([]);
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTickets();
  }, [loggedUser]);

  if (loading) return <Loading />;

  return (
    <View styles={styles.MainView}>
      <Title1>Available Tickets</Title1>
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
        <Kanban data={tickets} model="ticket" />
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
