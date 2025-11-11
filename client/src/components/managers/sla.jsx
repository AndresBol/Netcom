import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useSLAForm } from "@validations/sla";
import { useEffect, useState } from "react";
import SlaService from "@services/sla";
import CategoryService from "@services/category";
import PriorityService from "@services/priority";
import toast from "react-hot-toast";
import { Loading } from "@components/loading";
import React from "react";
import { useNavigate } from "react-router-dom";

export function SLAManager({ record }) {
  const [loading, setLoading] = React.useState(false);
  const [isUploading, setUploading] = React.useState(false);
  const [currentSLA, setCurrentSLA] = useState(record);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const navigate = useNavigate();

  // Update currentSLA when record prop changes
  useEffect(() => {
    setCurrentSLA(record);
  }, [record]);

  const formData = [
    {
      label: "Category",
      fieldName: "category_id",
      fieldType: "one2many",
      data: categories,
    },
    {
      label: "Priority",
      fieldName: "priority_id",
      fieldType: "one2many",
      data: priorities,
    },
    {
      label: "Response Time",
      fieldName: "response_time",
      fieldType: "number",
    },
    {
      label: "Resolution Time",
      fieldName: "resolution_time",
      fieldType: "number",
    },
  ];

  const fetchModels = async () => {
    // Fetch Categories
    const response = await CategoryService.getAll();
    setCategories(response.data);

    // Fetch Priorities
    const priorityResponse = await PriorityService.getAll();
    setPriorities(priorityResponse.data);
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
      if (currentSLA) {
        response = await SlaService.update(DataForm);
      } else {
        response = await SlaService.insert(DataForm);
      }

      // Update the current SLA with the response data
      if (response && response.data) {
        setCurrentSLA(response.data);
      }

      toast.success("SLA modified!");
    } catch (error) {
      console.error("Error modifying SLA:", error);
      toast.error("Failed to modify SLA");
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async () => {
    try {
      await SlaService.delete(currentSLA.id)
        .then((response) => {
          console.log("SLA deleted:", response.data);
          navigate(`/sla/index`);
          toast.success("SLA deleted!");
        })
        .catch((error) => {
          console.error("Error deleting SLA:", error);
        });
    } catch (error) {
      console.error("Error deleting SLA:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <Box>
      <Form
        formData={formData}
        record={currentSLA}
        isUploading={isUploading}
        useModelForm={() => useSLAForm(currentSLA)}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Box>
  );
}
