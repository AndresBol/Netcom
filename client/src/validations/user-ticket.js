import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const userTicketSchema = (t, ticketId, userId) => yup.object({
  id: yup
    .number()
    .nullable(),
  user_id: yup
    .number()
    .when([], {
      is: () => !userId,
      then: (schema) => schema.required(t('validation.userRequired')),
      otherwise: (schema) => schema.nullable(),
    }),
  ticket_id: yup
    .number()
    .when([], {
      is: () => !ticketId,
      then: (schema) => schema.required(t('validation.ticketRequired')),
      otherwise: (schema) => schema.nullable(),
    }),
  assigned_by: yup
    .number()
    .nullable(),
});

export const useUserTicketForm = (userTicket, ticketId, userId) => {
  const { t } = useTranslation();
  return useForm({
    defaultValues: {
      'id': userTicket ? userTicket.id : null,
      'user_id': userId || (userTicket ? userTicket.user_id : null),
      'ticket_id': ticketId || (userTicket ? userTicket.ticket_id : null),
      'assigned_by': userTicket ? userTicket.assigned_by : null,
    },
    resolver: yupResolver(userTicketSchema(t, ticketId, userId)),
    values: userTicket ? {
      'id': userTicket.id,
      'user_id': userId || userTicket.user_id,
      'ticket_id': ticketId || userTicket.ticket_id,
      'assigned_by': userTicket.assigned_by,
    } : undefined,
  });
};