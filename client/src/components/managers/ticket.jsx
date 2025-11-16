import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useTicketForm } from "@validations/ticket";
import { useEffect } from "react";
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
import { useState } from "react";
import { useLoggedUser } from "@contexts/UserContext";

export function TicketManager({ record }) {
  const [loading, setLoading] = React.useState(false);
  const [isUploading, setUploading] = React.useState(false);
  const [currentTicket, setCurrentTicket] = useState(record);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [labels, setLabels] = useState([]);
  const [categoryLabels, setCategoryLabels] = useState([]);
  const [formInstance, setFormInstance] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    record?.category_id ?? null
  );
  const { loggedUser } = useLoggedUser();

  const navigate = useNavigate();

  const toNumericId = (value) => {
    if (value === undefined || value === null || value === "") {
      return null;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  };

  // Update currentTicket when record prop changes
  useEffect(() => {
    setCurrentTicket(record);
    setSelectedCategoryId(record?.category_id ?? null);
  }, [record]);

  // Subscribe to form updates to keep track of select values
  useEffect(() => {
    if (!formInstance) return;

    const currentCategoryValue = toNumericId(
      formInstance.getValues("category_id")
    );
    if (currentCategoryValue !== undefined && currentCategoryValue !== null) {
      setSelectedCategoryId(currentCategoryValue);
    }

    const subscription = formInstance.watch((value, { name }) => {
      if (!name) return;
      if (name === "category_id") {
        setSelectedCategoryId(toNumericId(value?.[name]));
      }
    });

    return () => subscription.unsubscribe();
  }, [formInstance]);

  // Ensure a category is always selected once data is available
  useEffect(() => {
    if (!formInstance || !categories.length) return;

    const currentCategory = toNumericId(formInstance.getValues("category_id"));
    const categoryExists = categories.some(
      (category) => toNumericId(category.id) === currentCategory
    );

    if (currentCategory && categoryExists) {
      if (selectedCategoryId !== currentCategory) {
        setSelectedCategoryId(currentCategory);
      }
      return;
    }

    const fallbackCategory = toNumericId(categories[0]?.id);

    if (fallbackCategory === null) return;

    formInstance.setValue("category_id", fallbackCategory, {
      shouldDirty: false,
      shouldTouch: false,
    });
    setSelectedCategoryId(fallbackCategory);
  }, [categories, formInstance, selectedCategoryId]);

  // Filter labels by selected category and make sure one label stays selected
  useEffect(() => {
    const normalizedCategoryId = toNumericId(selectedCategoryId);

    if (!normalizedCategoryId) {
      setCategoryLabels([]);
      if (formInstance) {
        formInstance.setValue("label_id", null, {
          shouldDirty: false,
          shouldTouch: false,
        });
      }
      return;
    }

    const filteredLabels = labels.filter((label) => {
      const labelCategoryId = toNumericId(label.category_id);
      return labelCategoryId === normalizedCategoryId;
    });
    setCategoryLabels(filteredLabels);

    if (!formInstance) return;

    const currentLabel = toNumericId(formInstance.getValues("label_id"));
    const labelExists = filteredLabels.some(
      (label) => toNumericId(label.id) === currentLabel
    );

    if (labelExists) {
      return;
    }

    const fallbackLabel = toNumericId(filteredLabels[0]?.id);
    formInstance.setValue("label_id", fallbackLabel, {
      shouldDirty: false,
      shouldTouch: false,
    });
  }, [labels, selectedCategoryId, formInstance]);

  // Check if the current ticket status is Resolved or Closed
  const currentStatus = statuses.find(
    (status) => status.id === currentTicket?.status_id
  );
  const isResolvedOrClosed =
    currentStatus &&
    (currentStatus.name === "Resolved" || currentStatus.name === "Closed");

  const formData = [
    {
      label: "Status",
      fieldName: "status_id",
      fieldType: "one2many",
      data: statuses,
      readonly: loggedUser?.role === "Client",
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
      fieldName: "label_id",
      fieldType: "one2many",
      data: categoryLabels,
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
      const isNewTicket = !currentTicket;

      if (currentTicket) {
        // Include the id field when updating
        response = await TicketService.update({
          ...DataForm,
          id: currentTicket.id,
        });
      } else {
        response = await TicketService.insert(DataForm);
      }

      // Update the current ticket with the response data
      if (response && response.data) {
        setCurrentTicket(response.data);

        // If it's a new ticket, create the relation with the logged user
        if (isNewTicket && loggedUser) {
          try {
            await UserTicketService.insert({
              user_id: loggedUser.id,
              ticket_id: response.data.id,
              assigned_by: loggedUser.id,
            });
          } catch (error) {
            console.error("Error creating user-ticket relation:", error);
            toast.error("Ticket created but failed to assign to user");
          }
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
      //Delete user on DB via API
      await TicketService.delete(currentTicket.id)
        .then((response) => {
          console.log("Ticket deleted:", response.data);
          navigate(`/ticket/index/by-user`);
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
        onFormReady={setFormInstance}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Box>
  );
}
