import Box from "@mui/material/Box";
import { FormHeader } from "@components/form-header";
import { Controller } from "react-hook-form";
import { Select } from "@components/select";
import TextField from "@mui/material/TextField";
import { Rating, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
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
    case "stagebar":
      const [alignment, setAlignment] = React.useState(
        field.value || fieldConfig.data[0]?.id || null
      );
      const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
      };
      control = (
        <ToggleButtonGroup
          field={field}
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          sx={styles.StageBar}
        >
          {fieldConfig.data &&
            fieldConfig.data.map((item) => (
              <ToggleButton
                key={item.id}
                value={item.id}
                disabled={!isEditing || fieldConfig.readonly}
              >
                {item.name}
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
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
  onFormReady,
}) {
  const [isEditing, setIsEditing] = useState(record ? false : true);
  const { t } = useTranslation();

  const formApi = useModelForm();

  useEffect(() => {
    if (!onFormReady) return;
    onFormReady(formApi);

    return () => {
      onFormReady(null);
    };
  }, [formApi, onFormReady]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = formApi;

  const onError = (errors, e) => {
    console.log(errors, e);
    toast.error(t("messages.formErrors"));
  };

  const submitForm = handleSubmit(async (formValues) => {
    await onSubmit(formValues);
    reset();
    setIsEditing(false);
  }, onError);

  const title = record?.name
    ? record.name
    : record?.title
      ? record.title
      : t("common.newRecord");

  return (
    <Box sx={styles.Container}>
      <form onSubmit={submitForm} noValidate>
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
  StageBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    marginBottom: 5,
  },
};
