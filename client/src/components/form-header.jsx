import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Title2 } from "@components/typography";
import { CircularProgress } from "@mui/material";
export function FormHeader({
  isEditing,
  isUploading,
  isNewRecord,
  onEditChange,
  onDeleteBtnClick,
  title,
}) {
  return (
    <Box sx={styles.Container}>
      {isEditing ? (
        <>
          <Box sx={styles.ChildContainer}>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              {isUploading ? (
                <CircularProgress color="white" size={25} />
              ) : (
                "Save"
              )}
            </Button>
            <Title2>{title}</Title2>
          </Box>
          {!isNewRecord && (
            <Box sx={styles.ChildContainer}>
              <Button type="button" color="error" onClick={onDeleteBtnClick}>
                <DeleteIcon />
              </Button>
              <Button
                type="button"
                variant="contained"
                color="grey"
                startIcon={<CloseIcon />}
                onClick={() => onEditChange(false)}
              >
                Cancel
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box sx={styles.ChildContainer}>
          <Button
            type="button"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={(e) => {
              e.preventDefault();
              onEditChange(true);
            }}
          >
            Edit
          </Button>
          <Title2>{title}</Title2>
        </Box>
      )}
    </Box>
  );
}

const styles = {
  Container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    marginBottom: 6,
  },
  ChildContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    gap: 2,
  },
};
