import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useTicketForm } from "@validations/ticket";
import { useEffect } from "react";
import TicketService from "@services/ticket";
import toast from "react-hot-toast";
import { Loading } from "@components/loading";
import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryService from "@services/category";
import PriorityService from "@services/priority";
import TicketLabelService from "@services/ticket-label";
import StatusService from "@services/status";
import { useState } from "react";

export function TicketManager({ record }) {
  const [loading, setLoading] = React.useState(false);
  const [isUploading, setUploading] = React.useState(false);
  const [currentTicket, setCurrentTicket] = useState(record);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [labels, setLabels] = useState([]);

  const navigate = useNavigate();

  // Update currentTicket when record prop changes
  useEffect(() => {
    setCurrentTicket(record);
  }, [record]);

  const formData = [
    {
      label: "Status",
      fieldName: "status_id",
      fieldType: "one2many",
      data: statuses,
    },
    {
      label: "Title",
      fieldName: "title",
      fieldType: "string",
    },
    {
      label: "Description",
      fieldName: "description",
      fieldType: "string",
    },
    {
      label: "Category",
      fieldName: "category_id",
      fieldType: "one2many",
      data: categories,
    },
    {
      label: "Priority",
      fieldName: "priority_id",
      fieldType: "one2many",
      data: priorities,
    },
    {
      label: "Labels",
      fieldName: "label_ids",
      fieldType: "one2many",
      data: labels,
    },
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

    //Fetch Statuses
    const statusResponse = await StatusService.getAll();
    setStatuses(statusResponse.data);
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

  const onSubmit = async (DataForm) => {
    setUploading(true);
    try {
      let response;
      if (currentTicket) {
        response = await TicketService.update(DataForm);
      } else {
        response = await TicketService.insert(DataForm);
      }

      // Update the current user with the response data
      if (response && response.data) {
        setCurrentTicket(response.data);
      }

      toast.success("Ticket modified!");
    } catch (error) {
      console.error("Error modifying ticket:", error);
      toast.error("Failed to modify ticket");
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async () => {
    try {
      //Delete user on DB via API
      await TicketService.delete(currentTicket.id)
        .then((response) => {
          console.log("Ticket deleted:", response.data);
          navigate(`/ticket/index`);
          toast.success("Ticket deleted!");
        })
        .catch((error) => {
          console.error("Error deleting ticket:", error);
        });
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <Box>
      <Form
        formData={formData}
        record={currentTicket}
        isUploading={isUploading}
        useModelForm={() => useTicketForm(currentTicket)}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Box>
  );
}
