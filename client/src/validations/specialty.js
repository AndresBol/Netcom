import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const specialtySchema = yup.object({
  id: yup
    .number()
    .nullable(),
  category_id: yup
    .number()
    .typeError('Only accepts numbers')
    .required('Category is required'),
  name: yup
    .string()
    .required('Name is required')
    .max(255, 'Name cannot exceed 255 characters'),
});

export const useSpecialtyForm = (specialty) => {
  return useForm({
    defaultValues: {
      'id': specialty ? specialty.id : null,
      'category_id': specialty ? specialty.category_id : 1,
      'name': specialty ? specialty.name : '',
     
    },
    resolver: yupResolver(specialtySchema),
    values: specialty ? {
      'id': specialty.id,
      'category_id': specialty.category_id,
      'name': specialty.name,
    } : undefined,
  });
};
