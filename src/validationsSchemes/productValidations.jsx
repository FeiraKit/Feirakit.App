import * as yup from 'yup'

export const mainInfoSchema = yup.object({
  nome: yup.string().required('informe o nome do produto'),
  categoria: yup.string().required('selecione a categoria do produto'),
  unidade: yup.string().required('selecione o tipo de unidade'),
  preco: yup.string().required('informe o preço do produto'),
})
