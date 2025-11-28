import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Body, SubTitle } from "./typography.jsx";
import { View } from "./view.jsx";
import { formatDate, formatTime } from "@utils/date-manager";
import TodayIcon from "@mui/icons-material/Today";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { getSlaStatusIcon } from "@utils/sla-manager";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <Card
      sx={styles.CardContainer}
      onClick={() => navigate(`/ticket/${ticket.id}`)}
    >
      <CardContent sx={styles.CardContent}>
        <SubTitle bold>
          #{ticket.id} {ticket.title}
        </SubTitle>
        <Body>
          {t("fields.category")}: {ticket.category_name}
        </Body>
        <Body>
          {t("fields.priority")}: {ticket.priority_name}
        </Body>
        {ticket.label_name && (
          <Body>
            {t("fields.labels")}: {ticket.label_name}
          </Body>
        )}
        <Body>
          <br />
        </Body>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SubTitle bold>
            {ticket.status_name !== "Resolved" ? (
              getSlaStatusIcon(ticket.created_on, ticket.resolution_time, t)
            ) : (
              <IconButton size="large" edge="start">
                <TaskAltIcon />
              </IconButton>
            )}
          </SubTitle>
          <SubTitle bold>{ticket.status_name}</SubTitle>
        </Box>
      </CardContent>
      <CardActions sx={styles.ActionsContainer}>
        <Body>
          <TodayIcon />
          {formatDate(ticket.created_on, "en-US")}
        </Body>
        <Body>
          <QueryBuilderIcon />
          {formatTime(ticket.created_on, "en-US")}
        </Body>
      </CardActions>
    </Card>
  );
}

function KanbanItem(item) {
  const { t } = useTranslation();
  return (
    <Card
      sx={styles.CardContainer}
      onClick={() => console.log("Item clicked:", item.id)}
    >
      <CardContent sx={styles.CardContent}>
        <SubTitle bold>{item.title}</SubTitle>
        <Body>{item.description}</Body>
      </CardContent>
      <CardActions sx={styles.ActionsContainer}>
        <Button size="small">{t("kanban.viewDetails")}</Button>
      </CardActions>
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
    minHeight: 252,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(0.98)",
      backgroundColor: "#f5f5f5",
    },
  },
  CardContent: {
    flex: "1 1 auto",
  },
  ActionsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    flex: "0 0 auto",
  },
};
