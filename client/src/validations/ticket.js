import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const ticketSchema = yup.object({
  status_id: yup
        .number()
        .typeError('Only accepts numbers')
        .required('Status is required'),
  category_id: yup
        .number()
        .typeError('Only accepts numbers')
        .required('Category is required'),
  priority_id: yup
        .number()
        .typeError('Only accepts numbers')
        .required('Priority is required'),
  label_id: yup
        .number()
        .typeError('Only accepts numbers'),
  title: yup
        .string()
        .required('Title is required')
        .max(255, 'Title cannot exceed 255 characters'),
  description: yup
        .string(),
  notification_status: yup
        .string()
        .required('Notification status is required')
        .max(50, 'Notification status cannot exceed 50 characters'),
  rating: yup
        .number()
        .typeError('Only accepts numbers')
        .min(0, 'Minimum rating is 0')
        .max(5, 'Maximum rating is 5'),
  comment: yup
        .string()
        .max(500, 'Comment cannot exceed 500 characters'),
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