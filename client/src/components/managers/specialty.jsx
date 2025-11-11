import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useSpecialtyForm } from "@validations/specialty";
import { useEffect, useState } from "react";
import SpecialFieldService from "@services/special-field";
import CategoryService from "@services/category";
import toast from "react-hot-toast";
import { Loading } from "@components/loading";
import React from "react";
import { useNavigate } from "react-router-dom";

export function SpecialtyManager({ record }) {
  const [loading, setLoading] = React.useState(false);
  const [isUploading, setUploading] = React.useState(false);
  const [currentSpecialty, setCurrentSpecialty] = useState(record);
  const [categories, setCategories] = useState([]);

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
      if (currentSpecialty) {
        response = await SpecialFieldService.update(DataForm);
      } else {
        response = await SpecialFieldService.insert(DataForm);
      }

      // Update the current specialty with the response data
      if (response && response.data) {
        setCurrentSpecialty(response.data);
      }

      toast.success("Specialty modified!");
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
          navigate(`/specialty/index`);
          toast.success("Specialty deleted!");
        })
        .catch((error) => {
          console.error("Error deleting specialty:", error);
        });
    } catch (error) {
      console.error("Error deleting specialty:", error);
    }
  };

  if (loading) return <Loading />;

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
