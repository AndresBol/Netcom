import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const specialtySchema = (t) => yup.object({
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

export const useSpecialtyForm = (specialty) => {
  const { t } = useTranslation();
  return useForm({
    defaultValues: {
      'id': specialty ? specialty.id : null,
      'category_id': specialty ? specialty.category_id : 1,
      'name': specialty ? specialty.name : '',
     
    },
    resolver: yupResolver(specialtySchema(t)),
    values: specialty ? {
      'id': specialty.id,
      'category_id': specialty.category_id,
      'name': specialty.name,
    } : undefined,
  });
};
