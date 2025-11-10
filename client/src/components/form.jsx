import Box from "@mui/material/Box";
import { FormHeader } from "@components/form-header";
import { Controller } from "react-hook-form";
import { Select } from "@components/select";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import { useState } from "react";

function formControl(field, fieldConfig, errors, isEditing) {
  let control;

  switch (fieldConfig.fieldType) {
    case "string":
    case "password":
      control = (
        <TextField
          {...field}
          id={fieldConfig.fieldName}
          label={fieldConfig.label}
          variant="outlined"
          type={fieldConfig.fieldType === "password" ? "password" : "text"}
          disabled={!isEditing}
          sx={styles.FormInput}
          InputProps={{ sx: { textAlign: "center" } }}
          error={Boolean(errors[fieldConfig.fieldName])}
          helperText={
            errors[fieldConfig.fieldName]
              ? errors[fieldConfig.fieldName].message
              : " "
          }
        />
      );
      break;
    case "one2many":
      control = (
        <Select
          field={field}
          data={fieldConfig.data || []}
          model={fieldConfig.label}
          disabled={!isEditing}
          sx={styles.FormInput}
          multiple={fieldConfig.multipleSelection || false}
          error={Boolean(errors[fieldConfig.fieldName])}
          helperText={
            errors[fieldConfig.fieldName]
              ? errors[fieldConfig.fieldName].message
              : " "
          }
        />
      );
      break;
    default:
      control = <div>Unsupported field type</div>;
  }

  return control;
}

export function Form({
  formData,
  record = null,
  isUploading,
  useModelForm,
  onSubmit,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(record ? false : true);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useModelForm();

  const onError = (errors, e) => {
    console.log(errors, e);
    toast.error("Please fix the errors in the form.");
  };

  return (
    <Box sx={styles.Container}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit(onSubmit, onError)();
          reset();
          setIsEditing(false);
        }}
        noValidate
      >
        <FormHeader
          isEditing={isEditing}
          isUploading={isUploading}
          isNewRecord={record ? false : true}
          onEditChange={setIsEditing}
          onDeleteBtnClick={async () => {
            await onDelete();
            reset();
          }}
          title={record?.name ? record.name : "New Record"}
        />
        {formData.map((fieldConfig) => (
          <Controller
            key={fieldConfig.fieldName}
            name={fieldConfig.fieldName}
            control={control}
            render={({ field }) =>
              formControl(field, fieldConfig, errors, isEditing)
            }
          />
        ))}
      </form>
    </Box>
  );
}

const styles = {
  Container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "start",
    padding: "20px",
    gap: "40px",
  },
  FormInput: {
    width: "100%",
  },
};
