import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const labelSchema = (t) => yup.object({
  id: yup
    .number()
    .nullable(),
  category_id: yup
    .number()
    .typeError(t('validation.onlyAcceptsNumbers'))
    .required(t('validation.categoryRequired')),
  name: yup
    .string()
    .required(t('validation.nameRequired'))
    .max(255, t('validation.nameMaxLength')),
});

export const useLabelForm = (label) => {
  const { t } = useTranslation();
  return useForm({
    defaultValues: {
      'id': label ? label.id : null,
      'category_id': label ? label.category_id : 1,
      'name': label ? label.name : '',
    
    },
    resolver: yupResolver(labelSchema(t)),
    values: label ? {
      'id': label.id,
      'category_id': label.category_id,
      'name': label.name,
    } : undefined,
  });
};
