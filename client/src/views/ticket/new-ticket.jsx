import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";

function handleCreateTicket(ticket) {
  axios
    .post("http://localhost:81/netcom/ticket", ticket)
    .then((response) => {
      // Handle successful response
      alert("Ticket created:", response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error creating ticket:", error);
    });
}

export function NewTicket() {
  const [ticket, setTicket] = useState({
    status_id: 1,
    category_id: 1,
    priority_id: 1,
    label_id: 1,
    title: "",
    description: "",
    notification_status: "",
    notified_on: new Date(),
    created_on: new Date(),
    rating: 0,
    comment: "",
  });

  return (
    <>
      <Container sx={{ p: 2 }} maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Fill the form to create a new ticket
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary">
          Please fill out the following form to create a new ticket.
        </Typography>
      </Container>
      <TextField
        id="status_id"
        label="StatusId"
        variant="outlined"
        value={ticket.status_id}
        onChange={(event) => {
          setTicket({ ...ticket, status_id: event.target.value });
        }}
      />
      <TextField
        id="category_id"
        label="CategoryId"
        variant="outlined"
        value={ticket.category_id}
        onChange={(event) => {
          setTicket({ ...ticket, category_id: event.target.value });
        }}
      />
      <TextField
        id="priority_id"
        label="PriorityId"
        variant="outlined"
        value={ticket.priority_id}
        onChange={(event) => {
          setTicket({ ...ticket, priority_id: event.target.value });
        }}
      />
      <TextField
        id="label_id"
        label="LabelId"
        variant="outlined"
        value={ticket.label_id}
        onChange={(event) => {
          setTicket({ ...ticket, label_id: event.target.value });
        }}
      />
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        value={ticket.title}
        onChange={(event) => {
          setTicket({ ...ticket, title: event.target.value });
        }}
      />
      <TextField
        id="description_id"
        label="DescriptionId"
        variant="outlined"
        value={ticket.description}
        onChange={(event) => {
          setTicket({ ...ticket, description: event.target.value });
        }}
      />
      <TextField
        id="notification_status"
        label="NotificationStatus"
        variant="outlined"
        value={ticket.notification_status}
        onChange={(event) => {
          setTicket({ ...ticket, notification_status: event.target.value });
        }}
      />
      <TextField
        id="rating"
        label="Rating"
        variant="outlined"
        value={ticket.rating}
        onChange={(event) => {
          setTicket({ ...ticket, rating: event.target.value });
        }}
      />
      <TextField
        id="comment"
        label="Comment"
        variant="outlined"
        value={ticket.comment}
        onChange={(event) => {
          setTicket({ ...ticket, comment: event.target.value });
        }}
      />
      <Button variant="contained" onClick={handleCreateTicket(ticket)}>
        Create Ticket
      </Button>
    </>
  );
}
