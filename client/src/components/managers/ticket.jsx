import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useTicketForm } from "@validations/ticket";
import { useEffect, useState } from "react";
import TicketService from "@services/ticket";
import UserTicketService from "@services/user-ticket";
import toast from "react-hot-toast";
import { Loading } from "@components/loading";
import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryService from "@services/category";
import PriorityService from "@services/priority";
import TicketLabelService from "@services/ticket-label";
import StatusService from "@services/status";
import { useLoggedUser } from "@contexts/UserContext";
import TimelineService from "@services/timeline";

export function TicketManager({ record }) {
  const [loading, setLoading] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(record);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [labels, setLabels] = useState([]);
  const [formInstance, setFormInstance] = useState(null);

  const { loggedUser } = useLoggedUser();
  const navigate = useNavigate();

  const toNumericId = (value) => {
    if (value === undefined || value === null || value === "") return null;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  };

  // Update ticket when record changes
  useEffect(() => {
    setCurrentTicket(record);
  }, [record]);

  useEffect(() => {
    if (!formInstance || !labels.length) return;

    const subscription = formInstance.watch((value, { name }) => {
      if (name !== "label_id") return;

      const selectedLabelId = toNumericId(value.label_id);
      if (!selectedLabelId) return;

      const label = labels.find((l) => toNumericId(l.id) === selectedLabelId);
      if (!label) return;

      formInstance.setValue("category_id", toNumericId(label.category_id), {
        shouldDirty: true,
        shouldTouch: true,
      });
    });

    return () => subscription.unsubscribe();
  }, [formInstance, labels]);

  // Current status validation
  const currentStatus = statuses.find(
    (status) => status.id === currentTicket?.status_id
  );
  const isResolvedOrClosed =
    currentStatus &&
    (currentStatus.name === "Resolved" || currentStatus.name === "Closed");

  const formData = [
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
      label: "Status",
      fieldName: "status_id",
      fieldType: "one2many",
      data: statuses,
      readonly: loggedUser?.role === "Client",
    },
    {
      label: "Category",
      fieldName: "category_id",
      fieldType: "one2many",
      data: categories,
      readonly: true,
    },

    {
      label: "Labels",
      fieldName: "label_id",
      fieldType: "one2many",
      data: labels,
    },
    {
      label: "Priority",
      fieldName: "priority_id",
      fieldType: "one2many",
      data: priorities,
    },

    ...(isResolvedOrClosed
      ? [
          {
            label: "Rating",
            fieldName: "rating",
            fieldType: "rating",
          },
          {
            label: "Comments",
            fieldName: "comment",
            fieldType: "multiline",
          },
        ]
      : []),
  ];

  const fetchModels = async () => {
    const responseCategories = await CategoryService.getAll();
    setCategories(responseCategories.data);

    const responsePriorities = await PriorityService.getAll();
    setPriorities(responsePriorities.data);

    const responseLabels = await TicketLabelService.getAll();
    setLabels(responseLabels.data);

    const responseStatuses = await StatusService.getAll();
    setStatuses(responseStatuses.data);
  };

  useEffect(() => {
    setLoading(true);
    fetchModels()
      .catch((error) => console.error("Error fetching models:", error))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (DataForm) => {
    setUploading(true);
    try {
      let response;
      const isNewTicket = !currentTicket;

      if (currentTicket) {
        response = await TicketService.update({
          ...DataForm,
          id: currentTicket.id,
        });
      } else {
        response = await TicketService.insert(DataForm);
      }

      if (response?.data) {
        setCurrentTicket(response.data);

        if (isNewTicket && loggedUser) {
          await UserTicketService.insert({
            user_id: loggedUser.id,
            ticket_id: response.data.id,
            assigned_by: loggedUser.id,
          });

          await TimelineService.insert({
            ticket_id: response.data.id,
            user_id: loggedUser.id,
            subject: "Ticket created",
            description: `Ticket created by ${loggedUser.name}`,
          });

          navigate(`/ticket/${response.data.id}`);
        }
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
      await TicketService.delete(currentTicket.id);
      navigate(`/ticket/index/by-user`);
      toast.success("Ticket deleted!");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      toast.error("Error deleting ticket");
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
        onFormReady={setFormInstance}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Box>
  );
}
