import { Box } from "@mui/material";
import { Form } from "@components/form";
import { useUserTicketForm } from "@validations/user-ticket";
import { useEffect, useState } from "react";
import UserTicketService from "@services/user-ticket";
import UserService from "@services/user";
import TicketService from "@services/ticket";
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
    // Fetch Users
    const userResponse = await UserService.getAll();
    setUsers(
      userResponse.data
        .map((user) => ({
          ...user,
          name: `${user.name || ""} | ${user.role || ""}`,
        }))
        .sort((b, a) => (a.role || "").localeCompare(b.role || ""))
    );

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
