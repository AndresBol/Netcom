import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const timelineSchema = (t) => yup.object({
  id: yup
    .number()
    .nullable(),
  ticket_id: yup
    .number()
    .typeError(t('validation.onlyAcceptsNumbers'))
    .required(t('validation.ticketRequired')),
  user_id: yup
    .number()
    .typeError(t('validation.onlyAcceptsNumbers'))
    .required(t('validation.userRequired')),
  subject: yup
    .string()
    .required(t('validation.subjectRequired'))
    .max(255, t('validation.subjectMaxLength')),
  description: yup
    .string()
    .max(1000, t('validation.descriptionMaxLength')),
});

export const useTimelineForm = (timeline) => {
  const { t } = useTranslation();
  return useForm({
    defaultValues: {
      'id': timeline ? timeline.id : null,
      'ticket_id': timeline ? timeline.ticket_id : 1,
      'user_id': timeline ? timeline.user_id : 1,
      'subject': timeline ? timeline.subject : '',
      'description': timeline ? timeline.description : '',
    },
    resolver: yupResolver(timelineSchema(t)),
    values: timeline ? {
      'id': timeline.id,
      'ticket_id': timeline.ticket_id,
      'user_id': timeline.user_id,
      'subject': timeline.subject,
      'description': timeline.description,
    } : undefined,
  });
};
