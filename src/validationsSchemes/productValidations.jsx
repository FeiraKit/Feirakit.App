import * as yup from 'yup'

export const mainInfoSchema = yup.object({
  nome: yup.string().required('Informe o nome do produto'),
  categoria: yup.string().required('Selecione a categoria do produto'),
  unidade: yup.string().required('Selecione o tipo de unidade'),
  preco: yup.string().required('Informe o preço do produto'),
})

export const descriptionSchema = yup.object({
  descricao: yup.string().required('Nos fale um pouco sobre o produto'),
  estoque: yup.string().required('Nos fale quantos produtos estão disponíveis'),
})
export const imagesSchema = yup.object({
  imagem_url: yup.array().required('Adicione uma imagem'),
})

export const editProductSchema = yup.object({
  nome: yup.string().required('informe o nome do produto'),
  categoria: yup.string().required('selecione a categoria do produto'),
  descricao: yup.string().required('Adicione uma descrição para o produto'),
  unidade: yup.string().required('selecione o tipo de unidade'),
  bestbefore: yup.boolean(),
  estoque: yup.string().required('informe a quantidade de produtos em estoque'),
  preco: yup.string().required('informe o preço do produto'),
})
