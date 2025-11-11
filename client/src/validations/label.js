import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const labelSchema = yup.object({
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
});

export const useLabelForm = (label) => {
  return useForm({
    defaultValues: {
      'id': label ? label.id : null,
      'category_id': label ? label.category_id : 1,
      'name': label ? label.name : '',
    
    },
    resolver: yupResolver(labelSchema),
    values: label ? {
      'id': label.id,
      'category_id': label.category_id,
      'name': label.name,
    } : undefined,
  });
};
