import { Title1 } from "@components/typography";
import { View } from "@components/view";
import { useEffect, useState } from "react";
import TicketService from "@services/ticket";
import { Kanban } from "@components/kanban";
import { Loading } from "@components/loading";

export function TicketIndex() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  const fetchModels = async () => {
    //Fetch Tickets
    const response = await TicketService.getAll();
    setTickets(response.data);

    console.log("Tickets fetched:", response.data);
  };

  useEffect(() => {
    const loadTickets = async () => {
      setLoading(true);
      try {
        await fetchModels();
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTickets();
  }, []);

  if (loading) return <Loading />;

  return (
    <View styles={styles.MainView}>
      <Title1>Available Tickets</Title1>
      <Kanban data={tickets} model="ticket" />
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
