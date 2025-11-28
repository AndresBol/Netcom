import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const categorySchema = (t) => yup.object({
  id: yup
    .number()
    .nullable(),
  name: yup
    .string()
    .required(t('validation.nameRequired'))
    .max(255, t('validation.nameMaxLength')),
});

export const useCategoryForm = (category) => {
  const { t } = useTranslation();
  return useForm({
    defaultValues: {
      'id': category ? category.id : null,
      'name': category ? category.name : '',
    },
    resolver: yupResolver(categorySchema(t)),
    values: category ? {
      'id': category.id,
      'name': category.name,
    } : undefined,
  });
};
