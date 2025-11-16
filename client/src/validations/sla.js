import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const slaSchema = yup.object({
  id: yup
    .number()
    .nullable(),
  category_id: yup
    .number()
    .typeError('Only accepts numbers')
    .required('Category is required'),
  priority_id: yup
    .number()
    .typeError('Only accepts numbers')
    .required('Priority is required'),
  response_time: yup
    .number()
    .typeError('Only accepts numbers')
    .required('Response time is required')
    .min(0, 'Response time must be greater than or equal to 0'),
  resolution_time: yup
    .number()
    .typeError('Only accepts numbers')
    .required('Resolution time is required')
    .min(0, 'Resolution time must be greater than or equal to 0'),
     name: yup
        .string()
        .required('Name is required')
        .max(255, 'Name cannot exceed 255 characters'),
});

export const useSLAForm = (sla) => {
  return useForm({
    defaultValues: {
      'id': sla ? sla.id : null,
      'category_id': sla ? sla.category_id : 1,
      'priority_id': sla ? sla.priority_id : 1,
      'response_time': sla ? sla.response_time : 0,
      'resolution_time': sla ? sla.resolution_time : 0,
      'name': sla ? sla.name : '',
    },
    resolver: yupResolver(slaSchema),
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
