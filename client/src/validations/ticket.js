import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const ticketSchema = (t) => yup.object({
  status_id: yup
        .number()
        .typeError(t('validation.onlyAcceptsNumbers'))
        .required(t('validation.statusRequired')),
  category_id: yup
        .number()
        .typeError(t('validation.onlyAcceptsNumbers'))
        .required(t('validation.categoryRequired')),
  priority_id: yup
        .number()
        .typeError(t('validation.onlyAcceptsNumbers'))
        .required(t('validation.priorityRequired')),
  label_id: yup
        .number()
        .typeError(t('validation.onlyAcceptsNumbers')),
  title: yup
        .string()
        .required(t('validation.titleRequired'))
        .max(255, t('validation.titleMaxLength')),
  description: yup
        .string(),
  notification_status: yup
        .string()
        .required(t('validation.notificationStatusRequired'))
        .max(50, t('validation.notificationStatusMaxLength')),
  rating: yup
        .number()
        .typeError(t('validation.onlyAcceptsNumbers'))
        .min(0, t('validation.ratingMin'))
        .max(5, t('validation.ratingMax')),
  comment: yup
        .string()
        .max(500, t('validation.commentMaxLength')),
});

export const useTicketForm = (ticket) => {
  const { t } = useTranslation();
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
    resolver: yupResolver(ticketSchema(t)),
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