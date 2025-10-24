import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid, Paper, Box } from "@mui/material";
import { useEffect, useState } from "react";
import TicketService from "@services/ticket";
import CategoryService from "@services/category";
import PriorityService from "@services/priority";
import TicketLabelService from "@services/ticket-label";
import { useTicketForm } from "@validations/ticket";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Select } from "@components/select";
export function NewTicket() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [labels, setLabels] = useState([]);

  const statuses = [
    { id: 1, name: "Open" },
    { id: 2, name: "In Progress" },
    { id: 3, name: "Resolved" },
    { id: 4, name: "Closed" },
  ];

  const fetchModels = async () => {
    //Fetch Categories
    const response = await CategoryService.getAll();
    setCategories(response.data);

    //Fetch Priorities
    const priorityResponse = await PriorityService.getAll();
    setPriorities(priorityResponse.data);

    //Fetch Labels
    const labelResponse = await TicketLabelService.getAll();
    setLabels(labelResponse.data);
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
    reset,
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
          reset();
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper
        elevation={6}
        sx={{ p: 4, borderRadius: 3, backgroundColor: "background.paper" }}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Create a New Ticket
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Fill out the form below to create a new support ticket.
          </Typography>

          <Box>
            {/* Title */}
            <Grid container justifyContent="center" sx={{ mb: 4 }}>
              <Grid item xs={12} sm={11} md={10} lg={8}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="title"
                      label="Title"
                      variant="outlined"
                      sx={{
                        width: "600px",
                        maxWidth: "90vw",
                        margin: "0 auto",
                      }}
                      InputProps={{ sx: { textAlign: "center" } }}
                      error={Boolean(errors.title)}
                      helperText={errors.title ? errors.title.message : " "}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid justifyContent="center" container spacing={3}>
              {/* StatusId field*/}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="status_id"
                  control={control}
                  render={({ field }) => {
                    const status = statuses.find((s) => s.id === field.value);
                    return (
                      <TextField
                        {...field}
                        label="Status"
                        value={status ? status.name : ""}
                        fullWidth
                        InputProps={{ readOnly: true }}
                      />
                    );
                  }}
                />
              </Grid>

              {/* Category*/}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      field={field}
                      data={categories}
                      model="Categories"
                    />
                  )}
                />
              </Grid>

              {/* Priority*/}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="priority_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      field={field}
                      data={priorities}
                      model="Priorities"
                    />
                  )}
                />
              </Grid>

              {/* Label*/}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="label_id"
                  control={control}
                  render={({ field }) => (
                    <Select field={field} data={labels} model="Labels" />
                  )}
                />
              </Grid>

              {/* Notification */}

              {/* <Grid item xs={12} sm={6}>
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
              </Grid> */}
              {/* Rating */}
              {/* <Grid item xs={12} sm={6}>
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
              </Grid> */}

              {/* Comment
              <Grid item xs={12}>
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
              </Grid> */}
            </Grid>

            {/* Description */}
            <Grid container justifyContent="center" sx={{ my: 4 }}>
              <Grid item xs={12} sm={10} md={8} lg={6}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="description"
                      label="Description"
                      variant="outlined"
                      multiline
                      minRows={6}
                      maxRows={19}
                      sx={{
                        width: "600px",
                        maxWidth: "90vw",
                        margin: "0 auto",
                      }}
                      InputProps={{ sx: { textAlign: "left", padding: 2 } }}
                      error={Boolean(errors.description)}
                      helperText={
                        errors.description ? errors.description.message : " "
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} justifyContent="center" display="flex">
              <Button type="submit" variant="contained">
                {loading ? (
                  <CircularProgress color="white" size={25} />
                ) : (
                  "Create Ticket"
                )}
              </Button>
            </Grid>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
