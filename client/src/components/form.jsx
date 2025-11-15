import Box from "@mui/material/Box";
import { FormHeader } from "@components/form-header";
import { Controller } from "react-hook-form";
import { Select } from "@components/select";
import TextField from "@mui/material/TextField";
import { Rating, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useState } from "react";

function formControl(field, fieldConfig, errors, isEditing) {
  let control;

  switch (fieldConfig.fieldType) {
    case "string":
    case "password":
    case "number":
    case "multiline":
      control = (
        <TextField
          {...field}
          id={fieldConfig.fieldName}
          label={fieldConfig.label}
          variant="outlined"
          type={
            fieldConfig.fieldType === "string" ? "text" : fieldConfig.fieldType
          }
          multiline={fieldConfig.fieldType === "multiline"}
          rows={4}
          disabled={!isEditing || fieldConfig.readonly}
          sx={styles.FormInput}
          error={Boolean(errors[fieldConfig.fieldName])}
          helperText={
            errors[fieldConfig.fieldName]
              ? errors[fieldConfig.fieldName].message
              : " "
          }
        />
      );
      break;
    case "rating":
      control = (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="subtitle1" color="text.secondary">
            {fieldConfig.label}
          </Typography>
          <Rating
            {...field}
            name={fieldConfig.fieldName}
            size="large"
            disabled={!isEditing || fieldConfig.readonly}
            value={field.value || 0}
            onChange={(event, newValue) => {
              field.onChange(newValue);
            }}
          />
          {errors[fieldConfig.fieldName] && (
            <Typography variant="caption" color="error">
              {errors[fieldConfig.fieldName].message}
            </Typography>
          )}
        </Box>
      );
      break;
    case "one2many":
      control = (
        <Select
          field={field}
          data={fieldConfig.data || []}
          model={fieldConfig.label}
          disabled={!isEditing || fieldConfig.readonly}
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

  const title = record?.name
    ? record.name
    : record?.title
      ? record.title
      : "New Record";

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
          title={title}
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
