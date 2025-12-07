import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const AVAILABILITY_VALUES = [
  'Available',
  'Busy',
  'Overload',
  'Vacation',
  'MedicalLeave',
];

const buildPasswordSchema = (t, requirePassword) => {
  const baseSchema = yup
    .string()
    .trim()
    .min(8, t('validation.passwordMinLength'))
    .max(255, t('validation.passwordMaxLength'));

  if (requirePassword) {
    return baseSchema.required(t('validation.passwordRequired'));
  }

  return baseSchema
    .nullable()
    .transform((value) => (value === '' ? undefined : value))
    .notRequired();
};

export const userSchema = (t, { requirePassword } = { requirePassword: true }) => yup.object({
  id: yup
    .number()
    .nullable(),
  role_id: yup
    .number()
    .typeError(t('validation.onlyAcceptsNumbers'))
    .required(t('validation.roleRequired')),
  name: yup
    .string()
    .required(t('validation.nameRequired'))
    .max(150, t('validation.nameMaxLength')),
  email: yup
    .string()
    .email(t('validation.emailValid'))
    .required(t('validation.emailRequired'))
    .max(255, t('validation.emailMaxLength')),
  password: buildPasswordSchema(t, requirePassword),
  availability: yup
    .string()
    .oneOf(AVAILABILITY_VALUES)
    .default('Available'),
  special_field_ids: yup
    .array()
    .of(yup.number())
    .nullable(),
});

export const useUserForm = (user) => {
  const { t } = useTranslation();
  const requirePassword = !user;
  return useForm({
    defaultValues: {
      'id': user ? user.id : null,
      'role_id': user ? user.role_id : 1,
      'name': user ? user.name : '',
      'email': user ? user.email : '',
      'password': '',
      'availability': user ? user.availability : 'Available',
      'special_field_ids': user && user.special_fields ? user.special_fields.map(sf => sf.special_field_id) : [],
    },
    resolver: yupResolver(userSchema(t, { requirePassword })),
    values: user ? {
      'id': user.id,
      'role_id': user.role_id,
      'name': user.name,
      'email': user.email,
      'password': '',
      'availability': user.availability,
      'special_field_ids': user.special_fields ? user.special_fields.map(sf => sf.special_field_id) : [],
    } : undefined,
  });
};
