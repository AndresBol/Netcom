import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const userSchema = yup.object({
  id: yup
    .number()
    .nullable(),
  role_id: yup
    .number()
    .typeError('Only accepts numbers')
    .required('Role is required'),
  name: yup
    .string()
    .required('Name is required')
    .max(150, 'Name cannot exceed 150 characters'),
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required')
    .max(255, 'Email cannot exceed 255 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(255, 'Password cannot exceed 255 characters'),
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
