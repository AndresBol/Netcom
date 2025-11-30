import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useTimelineForm } from "@validations/timeline";
import { useEffect, useState } from "react";
import TimelineService from "@services/timeline";
import AttachmentService from "@services/ticket-attachment";
import TicketService from "@services/ticket";
import StatusService from "@services/status";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FileUploader } from "@components/file-uploader";

export function TimelineManager({ record, ticketId, userId, onSaved }) {
  const [isUploading, setUploading] = useState(false);
  const [currentTimeline, setCurrentTimeline] = useState(record);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [nextStatus, setNextStatus] = useState(null);
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentTimeline(record);
    if (record?.id) loadAttachments(record.id);
    if (ticketId) fetchTicket();
  }, [record, ticketId]);

  const loadAttachments = async (timelineId) => {
    try {
      const res = await AttachmentService.getByTimelineId(timelineId);
      setAttachments(res.data || []);
    } catch (err) {
      console.error("Error loading attachments:", err);
    }
  };

  const fetchTicket = async () => {
    try {
      const res = await TicketService.getById(ticketId);
      setCurrentTicket(res.data);
      const statusRes = await StatusService.getAll();
      const statuses = statusRes.data;
      const currentStatusId = res.data.status_id;
      const sortedStatuses = statuses.sort((a, b) => a.id - b.id);
      const currentIndex = sortedStatuses.findIndex(
        (s) => s.id === currentStatusId
      );
      if (currentIndex >= 0 && currentIndex < sortedStatuses.length - 1) {
        setNextStatus(sortedStatuses[currentIndex + 1]);
      } else {
        setNextStatus(null);
      }
    } catch (err) {
      console.error("Error fetching ticket:", err);
    }
  };

  const formData = [
    { label: t("fields.subject"), fieldName: "subject", fieldType: "string" },
    {
      label: t("fields.description"),
      fieldName: "description",
      fieldType: "string",
    },
  ];

  if (nextStatus) {
    formData.push({
      label: t("messages.updateStatusTo", { status: nextStatus.name }),
      fieldName: "updateStatus",
      fieldType: "checkbox",
    });
  }

  const onSubmit = async (DataForm) => {
    if (files.length === 0) {
      setUploading(true);
      toast.error(t("validation.atLeastOneImage"));
      setUploading(false);
      return;
    }

    setUploading(true);

    try {
      const dataToSend = {
        ...DataForm,
        ticket_id: ticketId || DataForm.ticket_id,
        user_id: userId || DataForm.user_id,
      };

      let response;

      if (currentTimeline) {
        response = await TimelineService.update(dataToSend);
      } else {
        response = await TimelineService.insert(dataToSend);
      }

      const newTimeline = response.data;

      if (files.length > 0) {
        await handleFileUpload(newTimeline.id);
      }

      const fullEntryRes = await TimelineService.getById(newTimeline.id);
      const fullEntry = fullEntryRes.data;

      if (onSaved) onSaved(fullEntry);

      if (DataForm.updateStatus && nextStatus) {
        try {
          const updatedTicket = { ...currentTicket, status_id: nextStatus.id };
          await TicketService.update(updatedTicket);
          toast.success(t("messages.statusUpdated"));
        } catch (err) {
          console.error("Error updating status:", err);
          toast.error(t("messages.failedToUpdateStatus"));
        }
      }

      toast.success(t("messages.timelineModified"));
    } catch (error) {
      console.error("Error modifying timeline:", error);
      toast.error(t("messages.failedToModifyTimeline"));
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (timelineId) => {
    try {
      const res = await AttachmentService.uploadFiles(timelineId, files);
      toast.success(t("messages.filesUploadedSuccessfully"));
      setFiles([]);
      setPreviews([]);
      await loadAttachments(timelineId);

      return res.data;
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error(t("messages.errorUploadingFiles"));
    }
  };

  const onDelete = async () => {
    try {
      await TimelineService.delete(currentTimeline.id)
        .then((response) => {
          console.log("Timeline deleted:", response.data);
          navigate(`/timeline/index`);
          toast.success(t("messages.timelineDeleted"));
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

      <Box mt={2}>
        <FileUploader
          files={files}
          setFiles={setFiles}
          previews={previews}
          setPreviews={setPreviews}
          label={t("fields.selectFiles")}
        />
      </Box>
    </Box>
  );
}
