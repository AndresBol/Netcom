import { Box, Button, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export function FileUploader({
  files,
  setFiles,
  previews,
  setPreviews,
  label,
}) {
  const fileInputRef = useRef(null);
  const { t } = useTranslation();

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const imagePreviews = selectedFiles.map((file) =>
      file.type.startsWith("image/") ? URL.createObjectURL(file) : null
    );

    setPreviews(imagePreviews);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  return (
    <Box>
      {/* Hidden input */}
      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {/* Button to open selector */}
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={() => fileInputRef.current.click()}
      >
        {label || t("common.uploadFiles")}
      </Button>

      {/* Previews */}
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
  );
}
