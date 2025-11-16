import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const timelineSchema = yup.object({
  id: yup
    .number()
    .nullable(),
  ticket_id: yup
    .number()
    .typeError('Only accepts numbers')
    .required('Ticket is required'),
  user_id: yup
    .number()
    .typeError('Only accepts numbers')
    .required('User is required'),
  subject: yup
    .string()
    .required('Subject is required')
    .max(255, 'Subject cannot exceed 255 characters'),
  description: yup
    .string()
    .max(1000, 'Description cannot exceed 1000 characters'),
});

export const useTimelineForm = (timeline) => {
  return useForm({
    defaultValues: {
      'id': timeline ? timeline.id : null,
      'ticket_id': timeline ? timeline.ticket_id : 1,
      'user_id': timeline ? timeline.user_id : 1,
      'subject': timeline ? timeline.subject : '',
      'description': timeline ? timeline.description : '',
    },
    resolver: yupResolver(timelineSchema),
    values: timeline ? {
      'id': timeline.id,
      'ticket_id': timeline.ticket_id,
      'user_id': timeline.user_id,
      'subject': timeline.subject,
      'description': timeline.description,
    } : undefined,
  });
};
