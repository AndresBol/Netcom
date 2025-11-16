import { Box, IconButton } from "@mui/material";
import { Form } from "@components/form";
import { useTimelineForm } from "@validations/timeline";
import { useEffect, useRef, useState } from "react";
import TimelineService from "@services/timeline";
import AttachmentService from "@services/ticket-attachment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

export function TimelineManager({ record, ticketId, userId }) {
  const [loading, setLoading] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [currentTimeline, setCurrentTimeline] = useState(record);
  const [files, setFiles] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [previews, setPreviews] = useState([]);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    setCurrentTimeline(record);
    if (record?.id) loadAttachments(record.id);
  }, [record]);

  const loadAttachments = async (timelineId) => {
    try {
      const res = await AttachmentService.getByTimelineId(timelineId);
      setAttachments(res.data || []);
    } catch (err) {
      console.error("Error loading attachments:", err);
    }
  };

  const formData = [
    { label: "Subject", fieldName: "subject", fieldType: "string" },
    { label: "Description", fieldName: "description", fieldType: "string" },
  ];

  const onSubmit = async (DataForm) => {
    setUploading(true);
    try {
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

      if (response && response.data) {
        setCurrentTimeline(response.data);
        toast.success("Timeline modified!");
      }

      if (files.length > 0) {
        await handleFileUpload(response.data.id);
      }
    } catch (error) {
      console.error("Error modifying timeline:", error);
      toast.error("Failed to modify timeline");
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (timelineId) => {
    try {
      const res = await AttachmentService.uploadFiles(timelineId, files);
      toast.success("Files uploaded successfully!");
      setFiles([]);
      setPreviews([]);
      loadAttachments(timelineId);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Error uploading files");
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

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const imagePreviews = selectedFiles.map((file) =>
      file.type.startsWith("image/") ? URL.createObjectURL(file) : null
    );

    setPreviews(imagePreviews);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
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
        <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={() => fileInputRef.current.click()}
          >
            Select Files
          </Button>   
        </Box>
        {files.length > 0 && (
          <Box
            mt={2}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              alignItems: "center",
            }}
          >
            {files.map((file, i) => (
              <Box
                key={i}
                sx={{
                  position: "relative",
                  width: 70,
                  height: 70,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                {previews[i] ? (
                  <Box
                    component="img"
                    src={previews[i]}
                    alt={`preview-${i}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      fontSize: 11,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      color: "#666",
                      backgroundColor: "#f5f5f5",
                      textAlign: "center",
                      px: 0.5,
                    }}
                  >
                    📄 {file.name}
                  </Box>
                )}

           
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                    p: 0.2,
                  }}
                  onClick={() => handleRemoveFile(i)}
                >
                  <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {attachments.length > 0 && (
        <Box mt={3}>
          <h4>Attachments</h4>
          <ul>
            {attachments.map((file) => (
              <li key={file.id}>
                <a
                  href={`http://localhost:81/netcom/uploads/${file.file_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.original_name || file.file_name}
                </a>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
}
