import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const categorySchema = yup.object({
  id: yup
    .number()
    .nullable(),
  name: yup
    .string()
    .required('Name is required')
    .max(255, 'Name cannot exceed 255 characters'),
});

export const useCategoryForm = (category) => {
  return useForm({
    defaultValues: {
      'id': category ? category.id : null,
      'name': category ? category.name : '',
    },
    resolver: yupResolver(categorySchema),
    values: category ? {
      'id': category.id,
      'name': category.name,
    } : undefined,
  });
};
