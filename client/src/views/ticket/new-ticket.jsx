import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export function NewTicket() {
  const [status_id, setStatus_id] = useState(1);
  const [category_id, setCategory_id] = useState(1);
  const [priority_id, setPriority_id] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notification_status, setNotification_status] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const notified_on = new Date();
  const created_on = new Date();

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
        value={status_id}
        onChange={(event) => {
          setStatus_id(event.target.value);
        }}
      />
      <TextField
        id="category_id"
        label="CategoryId"
        variant="outlined"
        value={category_id}
        onChange={(event) => {
          setCategory_id(event.target.value);
        }}
      />
      <TextField
        id="priority_id"
        label="PriorityId"
        variant="outlined"
        value={priority_id}
        onChange={(event) => {
          setPriority_id(event.target.value);
        }}
      />
      <TextField
        id="title_id"
        label="TitleId"
        variant="outlined"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <TextField
        id="description_id"
        label="DescriptionId"
        variant="outlined"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <TextField
        id="notification_status"
        label="NotificationStatus"
        variant="outlined"
        value={notification_status}
        onChange={(event) => {
          setNotification_status(event.target.value);
        }}
      />
      <TextField
        id="rating"
        label="Rating"
        variant="outlined"
        value={rating}
        onChange={(event) => {
          setRating(event.target.value);
        }}
      />
      <TextField
        id="comment"
        label="Comment"
        variant="outlined"
        value={comment}
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />
      <Button href="/ticket/new" variant="contained">
        Create Ticket
      </Button>
    </>
  );
}
