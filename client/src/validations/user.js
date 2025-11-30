import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const userSchema = (t) => yup.object({
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
  password: yup
    .string()
    .required(t('validation.passwordRequired'))
    .min(8, t('validation.passwordMinLength'))
    .max(255, t('validation.passwordMaxLength')),
  availability: yup
    .string()
    .nullable(),
  special_field_ids: yup
    .array()
    .of(yup.number())
    .nullable(),
});

export const useUserForm = (user) => {
  const { t } = useTranslation();
  return useForm({
    defaultValues: {
      'id': user ? user.id : null,
      'role_id': user ? user.role_id : 1,
      'name': user ? user.name : '',
      'email': user ? user.email : '',
      'password': user ? user.password : '',
      'availability': user ? user.availability : '',
      'special_field_ids': user && user.special_fields ? user.special_fields.map(sf => sf.special_field_id) : [],
    },
    resolver: yupResolver(userSchema(t)),
    values: user ? {
      'id': user.id,
      'role_id': user.role_id,
      'name': user.name,
      'email': user.email,
      'password': user.password,
      'availability': user.availability,
      'special_field_ids': user.special_fields ? user.special_fields.map(sf => sf.special_field_id) : [],
    } : undefined,
  });
};
