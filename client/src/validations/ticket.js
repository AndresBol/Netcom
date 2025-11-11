import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const ticketSchema = yup.object({
  status_id: yup
        .number()
        .typeError('Solo acepta números')
        .required('El estado es requerido'),
  category_id: yup
        .number()
        .typeError('Solo acepta números')
        .required('La categoría es requerida'),
  priority_id: yup
        .number()
        .typeError('Solo acepta números')
        .required('La prioridad es requerida'),
  label_id: yup
        .number()
        .typeError('Solo acepta números'),
  title: yup
        .string()
        .required('El título es requerido')
        .max(255, 'El título no puede exceder los 255 caracteres'),
  description: yup
        .string(),
  notification_status: yup
        .string()
        .required('El estado de notificación es requerido')
        .max(50, 'El estado de notificación no puede exceder los 50 caracteres'),
  rating: yup
        .number()
        .typeError('Solo acepta números')
        .required('La calificación es requerida')
        .min(0, 'La calificación mínima es 0')
        .max(5, 'La calificación máxima es 5'),
  comment: yup
        .string()
        .max(500, 'El comentario no puede exceder los 500 caracteres'),
});

export const useTicketForm = (ticket) => {
  return useForm({
    defaultValues: {
    'status_id': ticket ? ticket.status_id : 1,
    'category_id': ticket ? ticket.category_id : 1,
    'priority_id': ticket ? ticket.priority_id : 1,
    'label_id': ticket ? ticket.label_id : 1,
    'title': ticket ? ticket.title : '',
    'description': ticket ? ticket.description : '',
    'notification_status': ticket ? ticket.notification_status : 'Pending',
    'rating': ticket ? ticket.rating : 0,
    'comment': ticket ? ticket.comment : '',
    },
    resolver: yupResolver(ticketSchema),
    values: ticket ? {
      'status_id': ticket.status_id,
      'category_id': ticket.category_id,
      'priority_id': ticket.priority_id,
      'label_id': ticket.label_id,
      'title': ticket.title,
      'description': ticket.description,
      'notification_status': ticket.notification_status,
      'rating': ticket.rating,
      'comment': ticket.comment,
    } : undefined,
  });
};