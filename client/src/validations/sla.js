import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const slaSchema = yup.object({
  id: yup
    .number()
    .nullable(),
  category_id: yup
    .number()
    .typeError('Solo acepta números')
    .required('La categoría es requerida'),
  priority_id: yup
    .number()
    .typeError('Solo acepta números')
    .required('La prioridad es requerida'),
  response_time: yup
    .number()
    .typeError('Solo acepta números')
    .required('El tiempo de respuesta es requerido')
    .min(0, 'El tiempo de respuesta debe ser mayor o igual a 0'),
  resolution_time: yup
    .number()
    .typeError('Solo acepta números')
    .required('El tiempo de resolución es requerido')
    .min(0, 'El tiempo de resolución debe ser mayor o igual a 0'),
     name: yup
        .string()
        .required('El nombre es requerido')
        .max(255, 'El nombre no puede exceder los 255 caracteres'),
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
