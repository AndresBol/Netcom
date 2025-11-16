import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const labelSchema = yup.object({
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
