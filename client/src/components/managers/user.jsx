import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useUserForm } from "@validations/user";
import { useEffect } from "react";
import RoleService from "@services/role";
import SpecialFieldService from "@services/special-field";
import UserService from "@services/user";
import toast from "react-hot-toast";
import { Loading } from "@components/loading";
import React from "react";
import { useNavigate } from "react-router-dom";

export function UserManager({ record }) {
  const [loading, setLoading] = React.useState(false);
  const [isUploading, setUploading] = React.useState(false);
  const [roles, setRoles] = React.useState([]);
  const [specialFields, setSpecialFields] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(record);
  const [formInstance, setFormInstance] = React.useState(null);
  const [showSpecialFields, setShowSpecialFields] = React.useState(false);

  const navigate = useNavigate();

  const toNumericId = (value) => {
    if (value === undefined || value === null || value === "") return null;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  };

  // Update currentUser when record prop changes
  useEffect(() => {
    setCurrentUser(record);
  }, [record]);

  // Watch for role changes to show/hide special fields
  useEffect(() => {
    if (!formInstance || !roles.length) return;

    const subscription = formInstance.watch((value, { name }) => {
      if (name !== "role_id") return;

      const selectedRoleId = toNumericId(value.role_id);
      if (!selectedRoleId) {
        setShowSpecialFields(false);
        return;
      }

      const role = roles.find((r) => toNumericId(r.id) === selectedRoleId);
      if (!role) {
        setShowSpecialFields(false);
        return;
      }

      setShowSpecialFields(role.name === "Technician");
    });

    return () => subscription.unsubscribe();
  }, [formInstance, roles]);

  const formData = [
    {
      label: "Name",
      fieldName: "name",
      fieldType: "string",
    },
    {
      label: "Email",
      fieldName: "email",
      fieldType: "string",
    },
    {
      label: "Password",
      fieldName: "password",
      fieldType: "password",
    },
    {
      label: "Role",
      fieldName: "role_id",
      fieldType: "one2many",
      data: roles,
    },
    ...(showSpecialFields
      ? [
          {
            label: "Special Fields",
            fieldName: "special_field_ids",
            fieldType: "one2many",
            data: specialFields,
            multipleSelection: true,
          },
        ]
      : []),
  ];

  const fetchModels = async () => {
    //Fetch Roles
    const roleResponse = await RoleService.getAll();
    setRoles(roleResponse.data);

    //Fetch Special Fields
    const specialFieldResponse = await SpecialFieldService.getAll();
    setSpecialFields(specialFieldResponse.data);
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
      if (currentUser) {
        response = await UserService.update(DataForm);
      } else {
        response = await UserService.insert(DataForm);
      }

      // Update the current user with the response data
      if (response && response.data) {
        setCurrentUser(response.data);
      }

      toast.success("User modified!");
    } catch (error) {
      console.error("Error modifying user:", error);
      toast.error("Failed to modify user");
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async () => {
    try {
      //Delete user on DB via API
      await UserService.delete(currentUser.id)
        .then((response) => {
          console.log("User deleted:", response.data);
          navigate(`/user/index`);
          toast.success("User deleted!");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <Box>
      <Form
        formData={formData}
        record={currentUser}
        isUploading={isUploading}
        useModelForm={() => useUserForm(currentUser)}
        onFormReady={setFormInstance}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Box>
  );
}
