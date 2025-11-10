import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const userSchema = yup.object({
  id: yup
    .number()
    .nullable(),
  role_id: yup
    .number()
    .typeError('Solo acepta números')
    .required('El rol es requerido'),
  name: yup
    .string()
    .required('El nombre es requerido')
    .max(150, 'El nombre no puede exceder los 150 caracteres'),
  email: yup
    .string()
    .email('El email debe ser válido')
    .required('El email es requerido')
    .max(255, 'El email no puede exceder los 255 caracteres'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(255, 'La contraseña no puede exceder los 255 caracteres'),
  special_field_ids: yup
    .array()
    .of(yup.number())
    .nullable(),
});

export const useUserForm = (user) => {
  return useForm({
    defaultValues: {
      'id': user ? user.id : null,
      'role_id': user ? user.role_id : 1,
      'name': user ? user.name : '',
      'email': user ? user.email : '',
      'password': user ? user.password : '',
      'special_field_ids': user && user.special_fields ? user.special_fields.map(sf => sf.special_field_id) : [],
    },
    resolver: yupResolver(userSchema),
    values: user ? {
      'id': user.id,
      'role_id': user.role_id,
      'name': user.name,
      'email': user.email,
      'password': user.password,
      'special_field_ids': user.special_fields ? user.special_fields.map(sf => sf.special_field_id) : [],
    } : undefined,
  });
};
