import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDateUS, formatTimeUS } from "../../../utils/date-manager.js";

import {
  Card,
  CardContent,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import TicketService from "../../services/ticket";
import StatusService from "../../services/status";
import CategoryService from "../../services/category";
import PriorityService from "../../services/priority";
import TicketLabelService from "../../services/ticket-label";
export function TicketDetailView() {
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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  if (!ticket)
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Ticket not found
      </Typography>
    );

  const getName = (list, id) => list.find((item) => item.id === id)?.name || id;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
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
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}
        >
          Ticket - {ticket.id} - {ticket.title}
        </Typography>

        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent>
            <Grid container spacing={3}  justifyContent="center" sx={{ mb: 2 }}>
              <Grid item>

                <Typography variant= "subtitle2" sx={{mb:1}}>
                  Status:
                </Typography>
                <Chip
                  label={getName(statuses, ticket.status_id)}
                  color="primary"
                />
              </Grid>

              <Grid item>
                <Typography variant= "subtitle2" sx={{mb:1}}>
                  Priority:
                </Typography>
                <Chip
                  label={getName(priorities, ticket.priority_id)}
                  color="warning"
                />
              </Grid>

              <Grid item>
                <Typography variant= "subtitle2" sx={{mb:1}}>
                  Category:
                </Typography>
                <Chip
                  label={getName(categories, ticket.category_id)}
                  color="secondary"
                />
              </Grid>

              <Grid item>

                <Typography variant= "subtitle2" sx={{mb:1}}>
                  Label:
                </Typography>
                <Chip
                  label={getName(labels, ticket.label_id)}
                  color="success"
                />
              </Grid>
            </Grid>

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

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" color="text.secondary">
              Crated At:
            </Typography>
            <Typography variant="body2">
              {formatDateUS(ticket.created_on)} {formatTimeUS(ticket.created_on)}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
}
