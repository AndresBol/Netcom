import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useCategoryForm } from "@validations/category";
import { useEffect, useState } from "react";
import CategoryService from "@services/category";
import toast from "react-hot-toast";
import { Loading } from "@components/loading";
import React from "react";
import { useNavigate } from "react-router-dom";

export function CategoryManager({ record }) {
  const [loading, setLoading] = React.useState(false);
  const [isUploading, setUploading] = React.useState(false);
  const [currentCategory, setCurrentCategory] = useState(record);

  const navigate = useNavigate();

  // Update currentCategory when record prop changes
  useEffect(() => {
    setCurrentCategory(record);
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
      let response;
      if (currentCategory) {
        response = await CategoryService.update(DataForm);
      } else {
        response = await CategoryService.insert(DataForm);
      }

      // Update the current category with the response data
      if (response && response.data) {
        setCurrentCategory(response.data);
      }
      navigate(`/category/${response.data.id}`);
      toast.success("Category modified!");
    } catch (error) {
      console.error("Error modifying category:", error);
      toast.error("Failed to modify category");
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async () => {
    try {
      await CategoryService.delete(currentCategory.id)
        .then((response) => {
          console.log("Category deleted:", response.data);
          navigate(`/category/index`);
          toast.success("Category deleted!");
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <Box>
      <Form
        formData={formData}
        record={currentCategory}
        isUploading={isUploading}
        useModelForm={() => useCategoryForm(currentCategory)}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Box>
  );
}
