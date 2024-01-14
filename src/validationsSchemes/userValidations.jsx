import * as yup from 'yup'

export const UserDataSchema = yup.object({
  nome: yup.string().required('informe o seu nome completo'),
  email: yup
    .string()
    .required('Informe um email válido')
    .email('Informe um email válido'),
  telefone: yup.string().min(10).required('Informe um numero de whatsapp'),
  senha: yup
    .string()
    .min(6, 'a senha deve ter pelo menos 6 dígitos')
    .required('informe uma senha'),
})

export const UserAdressSchema = yup.object({
  cep: yup.string().min(7, 'CEP Inválido').required('Informe um CEP'),
  rua: yup.string().required('informe o nome da rua'),
  numero: yup.string().required('informe o número'),
  complemento: yup.string().required('informe um complemento'),
  bairro: yup.string().required('informe o bairro'),
  cidade: yup.string().required('informe o nome da cidade'),
  estado: yup.string().required('selecione o estado'),
})

export const EditUserSchema = yup.object({
  nome: yup.string().required('informe o seu nome completo'),
  email: yup
    .string()
    .required('Informe um email válido')
    .email('Informe um email válido'),
  telefone: yup.string().min(10).required('Informe um numero de whatsapp'),
  cep: yup.string().min(7, 'CEP Inválido').required('Informe um CEP'),
  rua: yup.string().required('informe o nome da rua'),
  numero: yup.string().required('informe o numero da sua residência'),
  complemento: yup.string().required('adicione um complemento'),
  bairro: yup.string().required('informe o bairro'),
  cidade: yup.string().required('informe o nome da cidade'),
  estado: yup.string().required('selecione o estado'),
})
