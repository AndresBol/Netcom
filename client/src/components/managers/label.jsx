import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useLabelForm } from "@validations/label";
import { useEffect, useState } from "react";
import TicketLabelService from "@services/ticket-label";
import CategoryService from "@services/category";
import toast from "react-hot-toast";
import { Loading } from "@components/loading";
import React from "react";
import { useNavigate } from "react-router-dom";

export function LabelManager({ record }) {
  const [loading, setLoading] = React.useState(false);
  const [isUploading, setUploading] = React.useState(false);
  const [currentLabel, setCurrentLabel] = useState(record);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // Update currentLabel when record prop changes
  useEffect(() => {
    setCurrentLabel(record);
  }, [record]);

  const formData = [
    {
      label: "Name",
      fieldName: "name",
      fieldType: "string",
    },
    {
      label: "Description",
      fieldName: "description",
      fieldType: "string",
    },
    {
      label: "Category",
      fieldName: "category_id",
      fieldType: "one2many",
      data: categories,
    },
  ];

  const fetchModels = async () => {
    // Fetch Categories
    const response = await CategoryService.getAll();
    setCategories(response.data);
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetchModels();
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmit = async (DataForm) => {
    setUploading(true);
    try {
      let response;
      if (currentLabel) {
        response = await TicketLabelService.update(DataForm);
      } else {
        response = await TicketLabelService.insert(DataForm);
      }

      // Update the current label with the response data
      if (response && response.data) {
        setCurrentLabel(response.data);
      }

      toast.success("Label modified!");
    } catch (error) {
      console.error("Error modifying label:", error);
      toast.error("Failed to modify label");
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async () => {
    try {
      await TicketLabelService.delete(currentLabel.id)
        .then((response) => {
          console.log("Label deleted:", response.data);
          navigate(`/label/index`);
          toast.success("Label deleted!");
        })
        .catch((error) => {
          console.error("Error deleting label:", error);
        });
    } catch (error) {
      console.error("Error deleting label:", error);
    }
  };

  if (loading) return <Loading />;

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
