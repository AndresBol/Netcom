import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const timelineSchema = yup.object({
  id: yup
    .number()
    .nullable(),
  ticket_id: yup
    .number()
    .typeError('Solo acepta números')
    .required('El ticket es requerido'),
  user_id: yup
    .number()
    .typeError('Solo acepta números')
    .required('El usuario es requerido'),
  subject: yup
    .string()
    .required('El asunto es requerido')
    .max(255, 'El asunto no puede exceder los 255 caracteres'),
  description: yup
    .string()
    .max(1000, 'La descripción no puede exceder los 1000 caracteres'),
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
