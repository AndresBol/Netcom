import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const specialtySchema = yup.object({
  id: yup
    .number()
    .nullable(),
  category_id: yup
    .number()
    .typeError('Solo acepta números')
    .required('La categoría es requerida'),
  name: yup
    .string()
    .required('El nombre es requerido')
    .max(255, 'El nombre no puede exceder los 255 caracteres'),
  description: yup
    .string()
    .max(500, 'La descripción no puede exceder los 500 caracteres'),
});

export const useSpecialtyForm = (specialty) => {
  return useForm({
    defaultValues: {
      'id': specialty ? specialty.id : null,
      'category_id': specialty ? specialty.category_id : 1,
      'name': specialty ? specialty.name : '',
      'description': specialty ? specialty.description : '',
    },
    resolver: yupResolver(specialtySchema),
    values: specialty ? {
      'id': specialty.id,
      'category_id': specialty.category_id,
      'name': specialty.name,
      'description': specialty.description,
    } : undefined,
  });
};
