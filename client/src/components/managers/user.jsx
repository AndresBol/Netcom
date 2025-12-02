import { Box, Card, CardContent, Typography } from "@mui/material";
import { Form } from "@components/form";
import { useUserForm, AVAILABILITY_VALUES } from "@validations/user";
import { useEffect } from "react";
import RoleService from "@services/role";
import SpecialFieldService from "@services/special-field";
import UserService from "@services/user";
import UserTicketService from "@services/user-ticket";
import toast from "react-hot-toast";
import { Loading } from "@components/loading";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function UserManager({ record }) {
  const [loading, setLoading] = React.useState(false);
  const [isUploading, setUploading] = React.useState(false);
  const [roles, setRoles] = React.useState([]);
  const [specialFields, setSpecialFields] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(record);
  const [formInstance, setFormInstance] = React.useState(null);
  const [showTechnicianFields, setShowTechnicianFields] = React.useState(false);
  const [workload, setWorkload] = React.useState(0);
  const { t } = useTranslation();

  const navigate = useNavigate();

  // Fetch technician workload
  const fetchTechnicianWorkload = async (userId) => {
    if (!userId) return;
    try {
      const response = await UserTicketService.getTechnicianWorkload(userId);
      if (response?.data?.workload !== undefined) {
        setWorkload(response.data.workload);
      }
    } catch (error) {
      console.error("Error fetching technician workload:", error);
      setWorkload(0);
    }
  };

  // Update currentUser when record prop changes
  useEffect(() => {
    setCurrentUser(record);
    const roleName = record?.role_name || record?.role;
    const isTechnician = roleName === "Technician";
    setShowTechnicianFields(isTechnician);

    if (isTechnician && record?.id) {
      fetchTechnicianWorkload(record.id);
    } else {
      setWorkload(0);
    }
  }, [record]);

  // Watch for role changes to show/hide special fields and run initial check
  useEffect(() => {
    if (!formInstance || !roles.length) return;

    const subscription = formInstance.watch((value, { name }) => {
      if (name !== "role_id") return;

      const selectedRoleId = toNumericId(value.role_id);
      const role = selectedRoleId
        ? roles.find((r) => toNumericId(r.id) === selectedRoleId)
        : null;
      const isTechnician = role?.name === "Technician";

      setShowTechnicianFields(isTechnician);
      if (isTechnician && currentUser?.id) {
        fetchTechnicianWorkload(currentUser.id);
      } else {
        setWorkload(0);
      }
    });

    // Run the initial check immediately after setting up the watch
    const currentValue = formInstance.getValues();
    const selectedRoleId = toNumericId(currentValue.role_id);
    const role = selectedRoleId
      ? roles.find((r) => toNumericId(r.id) === selectedRoleId)
      : null;
    const isTechnician = role?.name === "Technician";

    setShowTechnicianFields(isTechnician);
    if (isTechnician && currentUser?.id) {
      fetchTechnicianWorkload(currentUser.id);
    } else {
      setWorkload(0);
    }

    return () => subscription.unsubscribe();
  }, [formInstance, roles]);

  useEffect(() => {
    if (!formInstance) return;
    if (!showTechnicianFields) {
      formInstance.setValue("availability", "Available", {
        shouldDirty: false,
        shouldTouch: false,
      });
    }
  }, [showTechnicianFields, formInstance]);

  const availabilityOptions = React.useMemo(
    () =>
      AVAILABILITY_VALUES.map((value) => ({
        id: value,
        name: t(`userAvailability.${value}`, { defaultValue: value }),
      })),
    [t]
  );

  const formData = [
    {
      label: t("fields.name"),
      fieldName: "name",
      fieldType: "string",
    },
    {
      label: t("fields.email"),
      fieldName: "email",
      fieldType: "string",
    },
    {
      label: t("fields.password"),
      fieldName: "password",
      fieldType: "password",
    },
    {
      label: t("fields.role"),
      fieldName: "role_id",
      fieldType: "one2many",
      data: roles,
    },
    ...(showTechnicianFields
      ? [
          {
            label: t("fields.availability"),
            fieldName: "availability",
            fieldType: "one2many",
            data: availabilityOptions,
          },
          {
            label: t("fields.specialFields"),
            fieldName: "special_field_ids",
            fieldType: "one2many",
            data: specialFields,
            multipleSelection: true,
          },
        ]
      : []),
  ];

  const fetchModels = async () => {
    const roleResponse = await RoleService.getAll();
    setRoles(roleResponse.data);

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

      toast.success(t("messages.userModified"));
    } catch (error) {
      console.error("Error modifying user:", error);
      toast.error(t("messages.failedToModifyUser"));
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async () => {
    try {
      await UserService.delete(currentUser.id).then((response) => {
        navigate(`/user/index`);
        toast.success(t("messages.userDeleted"));
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(t("messages.failedToDeleteUser"));
    }
  };

  if (loading) return <Loading />;

  const toNumericId = (value) => {
    if (value === undefined || value === null || value === "") return null;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Form
        formData={formData}
        record={currentUser}
        isUploading={isUploading}
        useModelForm={() => useUserForm(currentUser)}
        onFormReady={setFormInstance}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
      {showTechnicianFields && (
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {t("fields.workload")}
            </Typography>
            <Typography variant="h5">
              {workload} {t("units.tickets")}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
