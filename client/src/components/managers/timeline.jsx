import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useTimelineForm } from "@validations/timeline";
import { useEffect, useState } from "react";
import TimelineService from "@services/timeline";
import toast from "react-hot-toast";
import React from "react";
import { useNavigate } from "react-router-dom";

export function TimelineManager({ record, ticketId, userId }) {
  const [loading, setLoading] = React.useState(false);
  const [isUploading, setUploading] = React.useState(false);
  const [currentTimeline, setCurrentTimeline] = useState(record);

  const navigate = useNavigate();

  // Update currentTimeline when record prop changes
  useEffect(() => {
    setCurrentTimeline(record);
  }, [record]);

  const formData = [
    {
      label: "Subject",
      fieldName: "subject",
      fieldType: "string",
    },
    {
      label: "Description",
      fieldName: "description",
      fieldType: "string",
    },
  ];

  const onSubmit = async (DataForm) => {
    setUploading(true);
    try {
      // Add ticketId and userId to the form data
      const dataWithTicketAndUser = {
        ...DataForm,
        ticket_id: ticketId || DataForm.ticket_id,
        user_id: userId || DataForm.user_id,
      };

      let response;
      if (currentTimeline) {
        response = await TimelineService.update(dataWithTicketAndUser);
      } else {
        response = await TimelineService.insert(dataWithTicketAndUser);
      }

      // Update the current timeline with the response data
      if (response && response.data) {
        setCurrentTimeline(response.data);
      }

      toast.success("Timeline modified!");
    } catch (error) {
      console.error("Error modifying timeline:", error);
      toast.error("Failed to modify timeline");
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async () => {
    try {
      await TimelineService.delete(currentTimeline.id)
        .then((response) => {
          console.log("Timeline deleted:", response.data);
          navigate(`/timeline/index`);
          toast.success("Timeline deleted!");
        })
        .catch((error) => {
          console.error("Error deleting timeline:", error);
        });
    } catch (error) {
      console.error("Error deleting timeline:", error);
    }
  };

  return (
    <Box>
      <Form
        formData={formData}
        record={currentTimeline}
        isUploading={isUploading}
        useModelForm={() => useTimelineForm(currentTimeline)}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Box>
  );
}
