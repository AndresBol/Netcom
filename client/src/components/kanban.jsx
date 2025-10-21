import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Body, SubTitle } from "./typography.jsx";
import { View } from "./view.jsx";
import { formatDate, formatTime } from "../../utils/date-manager.js";
import TodayIcon from "@mui/icons-material/Today";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { useNavigate } from "react-router-dom";

export function Kanban({ data, model = "basic" }) {
  return (
    <View styles={styles.KanbanContainer}>
      {data.map((item) =>
        model == "ticket" ? (
          <TicketKanbanItem key={item.id} {...item} />
        ) : (
          <KanbanItem key={item.id} {...item} />
        )
      )}
    </View>
  );
}

function TicketKanbanItem(ticket) {
  const navigate = useNavigate();
  return (
    <Card
      sx={styles.CardContainer}
      onClick={() => navigate(`/ticket/${ticket.id}`)}
    >
      <CardActionArea sx={styles.CardActionArea}>
        <CardContent>
          <SubTitle bold>{ticket.title}</SubTitle>
          <Body>Category: {ticket.category_name}</Body>
          <Body>Priority: {ticket.priority_name}</Body>
          {ticket.label_name ? (
            <Body>Label: {ticket.label_name}</Body>
          ) : (
            <Body>
              <br />
            </Body>
          )}
        </CardContent>
        <CardActions sx={styles.ActionsContainer}>
          <Body>
            <TodayIcon />
            {formatDate(ticket.created_on)}
          </Body>
          <Body>
            <QueryBuilderIcon />
            {formatTime(ticket.created_on)}
          </Body>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

function KanbanItem(item) {
  return (
    <Card
      sx={styles.CardContainer}
      onClick={() => console.log("Item clicked:", item.id)}
    >
      <CardActionArea sx={styles.CardActionArea}>
        <CardContent>
          <SubTitle bold>{item.title}</SubTitle>
          <Body>{item.description}</Body>
        </CardContent>
        <CardActions sx={styles.ActionsContainer}>
          <Button size="small">View Details</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

const styles = {
  KanbanContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "center",
    gap: 2,
    flexWrap: "wrap",
    padding: "20px",
  },
  CardContainer: {
    minWidth: 275,
    cursor: "pointer",
  },
  CardActionArea: {
    height: "100%",
    "&:hover": {
      backgroundColor: "action.selectedHover",
    },
  },
  ActionsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
  },
};
