import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useLabelForm } from "@validations/label";
import { useEffect, useState } from "react";
import TicketLabelService from "@services/ticket-label";
import toast from "react-hot-toast";
import React from "react";
import { useTranslation } from "react-i18next";

export function LabelManager({ record, categoryId, onSuccess }) {
  const [isUploading, setUploading] = React.useState(false);
  const [currentLabel, setCurrentLabel] = useState(record);
  const { t } = useTranslation();

  // Update currentLabel when record prop changes
  useEffect(() => {
    setCurrentLabel(record);
  }, [record]);

  const formData = [
    {
      label: t("fields.name"),
      fieldName: "name",
      fieldType: "string",
    },
  ];

  const onSubmit = async (DataForm) => {
    setUploading(true);
    try {
      const dataWithCategory = {
        ...DataForm,
        category_id: categoryId || DataForm.category_id,
      };

      let response;
      if (currentLabel) {
        response = await TicketLabelService.update(dataWithCategory);
      } else {
        response = await TicketLabelService.insert(dataWithCategory);
      }

      // Update the current label with the response data
      if (response && response.data) {
        setCurrentLabel(response.data);
      }

      toast.success(t("messages.labelModified"));

      // Call the onSuccess callback to refresh parent data
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error modifying label:", error);
      toast.error(t("messages.failedToModifyLabel"));
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async () => {
    try {
      await TicketLabelService.delete(currentLabel.id)
        .then((response) => {
          console.log("Label deleted:", response.data);
          toast.success(t("messages.labelDeleted"));

          // Call the onSuccess callback to refresh parent data
          if (onSuccess) {
            onSuccess();
          }
        })
        .catch((error) => {
          console.error("Error deleting label:", error);
        });
    } catch (error) {
      console.error("Error deleting label:", error);
    }
  };

  return (
    <Box>
      <Form
        formData={formData}
        record={currentLabel}
        isUploading={isUploading}
        useModelForm={() => useLabelForm(currentLabel)}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Box>
  );
}
