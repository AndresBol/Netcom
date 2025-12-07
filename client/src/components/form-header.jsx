import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Title2 } from "@components/typography";
import { CircularProgress } from "@mui/material";
import { useLoggedUser } from "@components/user/user-provider.jsx";
import { useTranslation } from "react-i18next";

export function FormHeader({
  isEditing,
  isUploading,
  isNewRecord,
  onEditChange,
  onCancel,
  onDeleteBtnClick,
  title,
}) {
  const { loggedUser } = useLoggedUser();
  const { t } = useTranslation();

  return (
    <Box sx={styles.Container}>
      {isEditing ? (
        <>
          <Box sx={styles.ChildContainer}>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              {isUploading ? (
                <CircularProgress color="inherit" size={25} />
              ) : isNewRecord ? (
                t("common.create")
              ) : (
                t("common.save")
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
                onClick={() => {
                  if (onCancel) {
                    onCancel();
                  } else if (onEditChange) {
                    onEditChange(false);
                  }
                }}
              >
                {t("common.cancel")}
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box sx={styles.ChildContainer}>
          {!isNewRecord && loggedUser?.role !== "Client" && (
            <Button
              type="button"
              variant="contained"
              startIcon={<EditIcon />}
              onClick={(e) => {
                e.preventDefault();
                onEditChange(true);
              }}
            >
              {t("common.edit")}
            </Button>
          )}
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
