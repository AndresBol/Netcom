import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const slaSchema = (t) => yup.object({
  id: yup
    .number()
    .nullable(),
  category_id: yup
    .number()
    .typeError(t('validation.onlyAcceptsNumbers'))
    .required(t('validation.categoryRequired')),
  priority_id: yup
    .number()
    .typeError(t('validation.onlyAcceptsNumbers'))
    .required(t('validation.priorityRequired')),
  response_time: yup
    .number()
    .typeError(t('validation.onlyAcceptsNumbers'))
    .required(t('validation.responseTimeRequired'))
    .min(0, t('validation.responseTimeMin')),
  resolution_time: yup
    .number()
    .typeError(t('validation.onlyAcceptsNumbers'))
    .required(t('validation.resolutionTimeRequired'))
    .min(0, t('validation.resolutionTimeMin')),
     name: yup
        .string()
        .required(t('validation.nameRequired'))
        .max(255, t('validation.nameMaxLength')),
});

export const useSLAForm = (sla) => {
  const { t } = useTranslation();
  return useForm({
    defaultValues: {
      'id': sla ? sla.id : null,
      'category_id': sla ? sla.category_id : 1,
      'priority_id': sla ? sla.priority_id : 1,
      'response_time': sla ? sla.response_time : 0,
      'resolution_time': sla ? sla.resolution_time : 0,
      'name': sla ? sla.name : '',
    },
    resolver: yupResolver(slaSchema(t)),
    values: sla ? {
      'id': sla.id,
      'category_id': sla.category_id,
      'priority_id': sla.priority_id,
      'response_time': sla.response_time,
      'resolution_time': sla.resolution_time,
      'name': sla.name,
    } : undefined,
  });
};
