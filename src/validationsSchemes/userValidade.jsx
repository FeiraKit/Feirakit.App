import * as yup from 'yup'

export const userSchema = yup.object({
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
  cep: yup.string().min(7, 'CEP Inválido').required('Informe um CEP'),
  rua: yup.string().required('informe o nome da rua'),
  numero: yup.string().required('informe o numero da sua residência'),
  complemento: yup.string(),
  bairro: yup.string().required('informe o bairro'),
  cidade: yup.string().required('informe o nome da cidade'),
  estado: yup.string().required('selecione o estado'),
})
