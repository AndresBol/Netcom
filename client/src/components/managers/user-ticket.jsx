import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useUserTicketForm } from "@validations/user-ticket";
import { useEffect, useState } from "react";
import UserTicketService from "@services/user-ticket";
import UserService from "@services/user";
import TicketService from "@services/ticket";
import StatusService from "@services/status";
import toast from "react-hot-toast";
import { Loading } from "@components/loading";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedUser } from "@components/user/user-provider.jsx";
import { useTranslation } from "react-i18next";

export function UserTicketManager({ record, ticketId, userId, onSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const [isUploading, setUploading] = React.useState(false);
  const [currentUserTicket, setCurrentUserTicket] = useState(record);
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const { t } = useTranslation();
  const { loggedUser } = useLoggedUser();

  const navigate = useNavigate();

  // Update currentUserTicket when record prop changes
  useEffect(() => {
    setCurrentUserTicket(record);
  }, [record]);

  const formData = [
    !userId && {
      label: t("fields.user"),
      fieldName: "user_id",
      fieldType: "one2many",
      data: users,
    },
    !ticketId && {
      label: t("fields.ticket"),
      fieldName: "ticket_id",
      fieldType: "one2many",
      data: tickets,
    },
  ].filter(Boolean);

  const fetchModels = async () => {
    const [userResponse, workloadResponse] = await Promise.all([
      UserService.getAll(),
      UserService.getTechniciansWorkload(),
    ]);

    const workloadMap = new Map(
      (workloadResponse?.data || []).map((tech) => [tech.id, tech.workload])
    );

    const isTechnician = (role) => (role || "").toLowerCase() === "technician";
    const formatSpecialties = (user) =>
      (user.special_fields || [])
        .map((sf) => sf.special_field_name || sf.category_name || sf.name || "")
        .filter(Boolean)
        .join(", ");

    const mappedUsers = (userResponse.data || []).map((user) => {
      const technicianExtras = [];
      if (isTechnician(user.role)) {
        const specialties = formatSpecialties(user);
        const workloadValue =
          workloadMap.get(user.id) ?? user.workload ?? undefined;

        if (specialties) {
          technicianExtras.push(`${t("fields.specialFields")}: ${specialties}`);
        }
        if (workloadValue !== undefined) {
          technicianExtras.push(`${t("fields.workload")}: ${workloadValue}`);
        }
      }

      const extraLabel =
        technicianExtras.length > 0 ? `${technicianExtras.join(" • ")}` : "";

      return {
        ...user,
        name: `${user.name || ""} | ${extraLabel ? extraLabel : user.role || ""}`,
        workload: workloadMap.get(user.id) ?? user.workload ?? null,
      };
    });

    const isAvailable = (availability) =>
      (availability || "").toLowerCase() === "available";

    const recordUserId = record?.user_id;

    let filteredUsers = mappedUsers
      .filter((user) =>
        recordUserId === user.id ? true : isAvailable(user.availability)
      )
      .sort((b, a) => (a.role || "").localeCompare(b.role || ""));

    // If ticketId is provided, filter out users already assigned to the ticket
    // and filter technicians by specialty matching ticket's category
    if (ticketId) {
      const assignedResponse = await UserTicketService.getByTicketId(ticketId);
      const assignedUserIds = assignedResponse.data.map((ut) => ut.user_id);

      const ticketResponse = await TicketService.getById(ticketId);
      const ticketCategoryId = ticketResponse.data.category_id;

      filteredUsers = filteredUsers
        .filter(
          (user) =>
            user.id === recordUserId || !assignedUserIds.includes(user.id)
        )
        .filter(
          (user) =>
            user.id === recordUserId ||
            user.role !== "Technician" ||
            (user.special_fields || []).some(
              (sf) => sf.category_id === ticketCategoryId
            )
        );
    }

    setUsers(filteredUsers);

    // Fetch Tickets
    const ticketResponse = await TicketService.getAll();
    setTickets(
      ticketResponse.data.map((ticket) => ({ ...ticket, name: ticket.title }))
    );
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
      const dataToSend = {
        ...DataForm,
        user_id: userId || DataForm.user_id,
        ticket_id: ticketId || DataForm.ticket_id,
        assigned_by: loggedUser.id,
      };

      // Check if ticket status should be updated
      const ticket = await TicketService.getById(dataToSend.ticket_id);
      const user = await UserService.getById(dataToSend.user_id);
      const userAvailability = (user.data?.availability || "").toLowerCase();

      if (userAvailability !== "available") {
        toast.error(
          t("messages.userNotAvailableForAssignment", {
            defaultValue: "Selected user is not available for new tickets",
          })
        );
        return;
      }
      if (
        ticket.data.status_name === "Pending" &&
        user.data.role === "Technician"
      ) {
        const statuses = await StatusService.getAll();
        const assignedStatus = statuses.data.find((s) => s.name === "Assigned");
        if (assignedStatus) {
          await TicketService.update({
            id: ticket.data.id,
            status_id: assignedStatus.id,
          });
          toast.success(t("messages.ticketStatusUpdated"));
        }
      }

      let response;
      if (currentUserTicket) {
        // For update, perhaps not implemented, or handle differently
        // Since the model reactivates if exists, maybe always insert
        response = await UserTicketService.insert(dataToSend);
      } else {
        response = await UserTicketService.insert(dataToSend);
      }

      // Update the current user ticket with the response data
      if (response && response.data) {
        setCurrentUserTicket(response.data);
      }
      toast.success(t("messages.userTicketModified"));
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error modifying user ticket:", error);
      toast.error(t("messages.failedToModifyUserTicket"));
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async () => {
    try {
      await UserTicketService.delete(currentUserTicket.id)
        .then((response) => {
          console.log("User ticket deleted:", response.data);
          toast.success(t("messages.userTicketDeleted"));
          if (onSuccess) onSuccess();
        })
        .catch((error) => {
          console.error("Error deleting user ticket:", error);
        });
    } catch (error) {
      console.error("Error deleting user ticket:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <Box>
      <Form
        formData={formData}
        record={currentUserTicket}
        isUploading={isUploading}
        useModelForm={() =>
          useUserTicketForm(currentUserTicket, ticketId, userId)
        }
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Box>
  );
}
