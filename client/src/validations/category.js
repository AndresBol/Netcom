import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const categorySchema = yup.object({
  id: yup
    .number()
    .nullable(),
  name: yup
    .string()
    .required('El nombre es requerido')
    .max(255, 'El nombre no puede exceder los 255 caracteres'),
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
