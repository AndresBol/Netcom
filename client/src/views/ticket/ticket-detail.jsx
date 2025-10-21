import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import TicketService from "../../services/ticket";
import StatusService from "../../services/status";
import CategoryService from "../../services/category";
import PriorityService from "../../services/priority";
import TicketLabelService from "../../services/ticket-label";
export function TicketDetail() {
  const { id } = useParams();
  const ticketId = id ? parseInt(id) : 1;

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatusest] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [labels, setLabels] = useState([]);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ticketId]);

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (!ticket)
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Ticket not found
      </Typography>
    );

  const getName = (list, id) => list.find((item) => item.id === id)?.name || id;

  return (
    <Container maxwidth="md" sx={{ mt: 4 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 600 }}>
          Ticket Detail
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Title:</Typography>
            <Typography sx={{ mb: 2 }}>{ticket.title}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Description:</Typography>
            <Typography sx={{ mb: 2 }}>{ticket.description}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Status:</Typography>
            <Typography>{getName(statuses, ticket.status_id)}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Priority:</Typography>
            <Typography>{getName(priorities, ticket.priority_id)}</Typography>
          </Grid>

            <Grid item xs={6}>
            <Typography variant="h6">Category:</Typography>
            <Typography>{getName(categories, ticket.category_id)}</Typography>
          </Grid>

            <Grid item xs={6}>
            <Typography variant="h6">Label:</Typography>
            <Typography>{getName(labels, ticket.label_id)}</Typography>
          </Grid>

        </Grid>
      </Paper>
    </Container>
  );
}
