import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function ImageDialog({
  open,
  onClose,
  data,
  dialogTitle = "Available Images",
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {data && data.length > 0 ? (
            data.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={"http://localhost:81/netcom/" + image.file}
                alt={image.file || `Image ${index + 1}`}
                sx={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "contain",
                  mb: 2,
                  borderRadius: 2,
                }}
              />
            ))
          ) : (
            <Box>No images available.</Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
