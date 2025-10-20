import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import TicketService from "../../services/ticket";
import CategoryService from "../../services/category";
import PriorityService from "../../services/priority";
import { useTicketForm } from "../../validations/ticket";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Select } from "../../components/select";

export function NewTicket() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const fetchModels = async () => {
    //Fetch Categories
    const response = await CategoryService.getAll();
    setCategories(response.data);

    //Fetch Priorities
    const priorityResponse = await PriorityService.getAll();
    setPriorities(priorityResponse.data);
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetchModels();
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useTicketForm();

  const onError = (errors, e) => {
    console.log(errors, e);
    toast.error("Please fix the errors in the form.");
  };

  const onSubmit = async (DataForm) => {
    setLoading(true);
    try {
      //Insert ticket on DB via API
      await TicketService.insert(DataForm)
        .then((response) => {
          console.log("Ticket created:", response.data);
          toast.success("Ticket created!");
        })
        .catch((error) => {
          console.error("Error creating ticket:", error);
        });
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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

      <Controller
        name="status_id"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="status_id"
            label="StatusId"
            variant="outlined"
            error={Boolean(errors.status_id)}
            helperText={errors.status_id ? errors.status_id.message : " "}
          />
        )}
      />
      <Controller
        name="category_id"
        control={control}
        render={({ field }) => (
          <Select field={field} data={categories} model="Categories" />
        )}
      />
      <Controller
        name="priority_id"
        control={control}
        render={({ field }) => (
          <Select field={field} data={priorities} model="Priorities" />
        )}
      />

      <Controller
        name="label_id"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="label_id"
            label="LabelId"
            variant="outlined"
            error={Boolean(errors.label_id)}
            helperText={errors.label_id ? errors.label_id.message : " "}
          />
        )}
      />

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="title"
            label="Title"
            variant="outlined"
            error={Boolean(errors.title)}
            helperText={errors.title ? errors.title.message : " "}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="description"
            label="Description"
            variant="outlined"
            error={Boolean(errors.description)}
            helperText={errors.description ? errors.description.message : " "}
          />
        )}
      />
      <Controller
        name="notification_status"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="notification_status"
            label="NotificationStatus"
            variant="outlined"
            error={Boolean(errors.notification_status)}
            helperText={
              errors.notification_status
                ? errors.notification_status.message
                : " "
            }
          />
        )}
      />
      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="rating"
            label="Rating"
            variant="outlined"
            error={Boolean(errors.rating)}
            helperText={errors.rating ? errors.rating.message : " "}
          />
        )}
      />
      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="comment"
            label="Comment"
            variant="outlined"
            error={Boolean(errors.comment)}
            helperText={errors.comment ? errors.comment.message : " "}
          />
        )}
      />
      <Button type="submit" variant="contained">
        {loading ? (
          <CircularProgress color="white" size={25} />
        ) : (
          "Create Ticket"
        )}
      </Button>
    </form>
  );
}
