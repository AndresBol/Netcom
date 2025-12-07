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
import { useLoggedUser } from "@components/user/user-provider.jsx";
import TimelineService from "@services/timeline";
import { useTranslation } from "react-i18next";
import { FileUploader } from "@components/file-uploader";
import AttachmentService from "@services/ticket-attachment";

export function TicketManager({ record, onAfterSubmit }) {
  const [loading, setLoading] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(record);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [labels, setLabels] = useState([]);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [formInstance, setFormInstance] = useState(null);
  const { t } = useTranslation();

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

  // Client users can submit feedback once per ticket
  const isClient = (loggedUser?.role || "").toLowerCase() === "client";
  const numericRating = Number(currentTicket?.rating);
  const hasRating = Number.isFinite(numericRating) && numericRating > 0;
  const hasComment = Boolean(currentTicket?.comment?.trim()?.length);
  const feedbackLocked = hasRating || hasComment;

  const formData = [
    {
      label: t("fields.status"),
      fieldName: "status_id",
      fieldType: "stagebar",
      data: statuses.sort((a, b) => a.id - b.id),
      readonly: true,
    },
    {
      label: t("fields.title"),
      fieldName: "title",
      fieldType: "string",
    },
    {
      label: t("fields.description"),
      fieldName: "description",
      fieldType: "string",
    },
    {
      label: t("fields.category"),
      fieldName: "category_id",
      fieldType: "one2many",
      data: categories,
      readonly: true,
    },

    {
      label: t("fields.labels"),
      fieldName: "label_id",
      fieldType: "one2many",
      data: labels,
    },
    {
      label: t("fields.priority"),
      fieldName: "priority_id",
      fieldType: "one2many",
      data: priorities,
    },

    ...(isResolvedOrClosed
      ? [
          {
            label: t("fields.rating"),
            fieldName: "rating",
            fieldType: "rating",
            alwaysEditable: true,
            readonly: !isClient || feedbackLocked,
          },
          {
            label: "Comments",
            fieldName: "comment",
            fieldType: "multiline",
            alwaysEditable: true,
            readonly: !isClient || feedbackLocked,
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
            assigned_by: null,
          });

          const timelineResponse = await TimelineService.insert({
            ticket_id: response.data.id,
            user_id: loggedUser.id,
            subject: "Ticket created",
            description: `Ticket created by ${loggedUser.name}`,
          });

          const timelineId = timelineResponse.data.id;

          if (files.length > 0) {
            await AttachmentService.uploadFiles(timelineId, files);
            toast.success(t("messages.attachmentsUploadedSuccessfully"));
          }

          navigate(`/ticket/${response.data.id}`);
        } else if (currentTicket && files.length > 0) {
          const timelineResponse = await TimelineService.insert({
            ticket_id: currentTicket.id,
            user_id: loggedUser.id,
            subject: "Ticket updated",
            description: `Ticket updated by ${loggedUser.name}`,
          });

          const timelineId = timelineResponse.data.id;

          await AttachmentService.uploadFiles(timelineId, files);
          toast.success(t("messages.attachmentsUploadedSuccessfully"));
        }
      }

      toast.success(t("messages.ticketModified"));
    } catch (error) {
      console.error("Error modifying ticket:", error);
      toast.error(t("messages.failedToModifyTicket"));
    } finally {
      setUploading(false);
      if (onAfterSubmit) {
        onAfterSubmit();
      }
    }
  };

  const onDelete = async () => {
    try {
      await TicketService.delete(currentTicket.id);
      navigate(`/`);
      toast.success(t("messages.ticketDeleted"));
    } catch (error) {
      console.error("Error deleting ticket:", error);
      toast.error(t("messages.failedToModifyTicket"));
    }
  };

  if (loading) return <Loading />;

  return (
    <Box>
      <Form
        key={currentTicket?.status_id}
        formData={formData}
        record={currentTicket}
        isUploading={isUploading}
        useModelForm={() => useTicketForm(currentTicket)}
        onFormReady={setFormInstance}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
      {!currentTicket && (
        <FileUploader
          files={files}
          setFiles={setFiles}
          previews={previews}
          setPreviews={setPreviews}
          label={t("fields.selectFiles")}
        />
      )}
    </Box>
  );
}
