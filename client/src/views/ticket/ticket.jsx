import { Title1 } from "../../components/typography";
import { View } from "../../components/view";
import { useParams } from "react-router-dom";

export function TicketDetail() {
  const { id } = useParams();
  const ticketId = Number(id);
  return (
    <View styles={styles.MainView}>
      <Title1>Ticket id: {ticketId}</Title1>
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
