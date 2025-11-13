import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useSpecialtyForm } from "@validations/specialty";
import { useEffect, useState } from "react";
import SpecialFieldService from "@services/special-field";
import toast from "react-hot-toast";
import React from "react";
import { useNavigate } from "react-router-dom";

export function SpecialtyManager({ record, categoryId, onSuccess }) {
  const [isUploading, setUploading] = React.useState(false);
  const [currentSpecialty, setCurrentSpecialty] = useState(record);

  const navigate = useNavigate();

  // Update currentSpecialty when record prop changes
  useEffect(() => {
    setCurrentSpecialty(record);
  }, [record]);

  const formData = [
    {
      label: "Name",
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
      if (currentSpecialty) {
        response = await SpecialFieldService.update(dataWithCategory);
      } else {
        response = await SpecialFieldService.insert(dataWithCategory);
      }

      // Update the current specialty with the response data
      if (response && response.data) {
        setCurrentSpecialty(response.data);
      }

      toast.success("Specialty modified!");

      // Call the onSuccess callback to refresh parent data
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error modifying specialty:", error);
      toast.error("Failed to modify specialty");
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async () => {
    try {
      await SpecialFieldService.delete(currentSpecialty.id)
        .then((response) => {
          console.log("Specialty deleted:", response.data);
          toast.success("Specialty deleted!");

          // Call the onSuccess callback to refresh parent data
          if (onSuccess) {
            onSuccess();
          }

          navigate(`/specialty/index`);
        })
        .catch((error) => {
          console.error("Error deleting specialty:", error);
        });
    } catch (error) {
      console.error("Error deleting specialty:", error);
    }
  };

  return (
    <Box>
      <Form
        formData={formData}
        record={currentSpecialty}
        isUploading={isUploading}
        useModelForm={() => useSpecialtyForm(currentSpecialty)}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Box>
  );
}
