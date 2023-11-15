import React from 'react'
import { Button, Text, VStack, useTheme } from 'native-base'
import { Alert, ScrollView } from 'react-native'
import { ButtonBack } from '../components/ButtonBack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ViaCep from '../services/ViaCep'
import { LogoFeira } from '../components/LogoFeira'
import { User } from '../services/user'
import { RegisterLabel } from '../components/FormComponents/RegisterLabel'
import { AcceptCheck } from '../components/FormComponents/AcceptCheck'
import { userSchema } from '../validationsSchemes/userValidade'
import { ControlledInput } from '../components/FormComponents/controlledInput'
import { ControlledSelect } from '../components/FormComponents/ControlledSelect'
import { removeNumberMask } from '../utils/removeMasks'

export function Register() {
  const user = new User()
  const { colors } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPolicy, setAcceptPolicy] = useState(false)

  const handleAcceptPolicy = () => {
    setAcceptPolicy(!acceptPolicy)
  }
  const handleAcceptTerms = () => {
    setAcceptTerms(!acceptTerms)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(userSchema),
  })

  const handleCreateUser = async (data) => {
    setIsLoading(true)
    let telefone = await removeNumberMask(data.telefone)
    let objUser = {
      email: data.email,
      nome: data.nome,
      senha: data.senha,
      endereco: {
        rua: data.rua,
        numero: data.numero,
        bairro: data.bairro,
        cep: data.cep,
        complemento: data.complemento,
        cidade: data.cidade,
        estado: data.estado,
      },
      telefone,
    }

    await user
      .createUser(objUser)
      .then(({ data }) => {
        if (!data.resultado) {
          setError('email', {
            type: 'custom',
            message: 'Este email já está sendo usado',
          })
          return Alert.alert(
            'Erro',
            'Este endereço de email já está sendo usado'
          )
        }
        user
          .checkPassword(objUser.email, objUser.senha)
          .then(({ data }) => {
            let jwtToken = data.token
            setIsLoading(false)
            user.getUserByEmail(objUser.email, jwtToken)
          })
          .catch((error) => {
            setIsLoading(false)
            if (error.response.data.mensagem) {
              return Alert.alert('Erro', 'Usuário ou senha inválidos')
            }
            return Alert.alert(
              'Erro',
              'Um erro inesperado aconteceu,tente novamente'
            )
          })
      })
      .catch(({ err }) => {
        setIsLoading(false)
        return Alert.alert(
          'Erro',
          'Um erro inesperado aconteceu,por favor tente novamente'
        )
      })
    setIsLoading(false)
  }

  const getAddressData = async (cep) => {
    await ViaCep.get(`${cep}/json/`)
      .then(({ data }) => {
        setValue('estado', data.uf)
        setValue('cidade', data.localidade)
        setValue('bairro', data.bairro)
        setValue('rua', data.logradouro)
        setValue('complemento', data.complemento)
      })
      .catch((err) => console.log(err))
  }

  return (
    <VStack
      w='full'
      alignItems='center'
      justifyContent='center'
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
        contentContainerStyle={{
          width: '100%',
          justifyContent: 'center',
          paddingBottom: 100,
        }}
      >
        <ButtonBack />
        <LogoFeira />
        <RegisterLabel title='Informações do usuário' />
        <ControlledInput
          control={control}
          name={'email'}
          iconName={'email'}
          placeholder={'E-mail'}
          infoText={'Informe um E-mail ativo'}
          error={errors.email}
          keyboardType={'email-address'}
        />
        <ControlledInput
          control={control}
          error={errors.senha}
          isPassword
          keyboardType={'password'}
          name={'senha'}
          iconName={'lock'}
          placeholder={'Senha'}
        />
        <RegisterLabel title='Dados pessoais' />
        <ControlledInput
          control={control}
          name={'nome'}
          placeholder={'Nome'}
          error={errors.nome}
          iconName={'person'}
        />

        {/* input mascarado telefone */}
        <ControlledInput
          isMasked
          control={control}
          name='telefone'
          error={errors.telefone}
          type={'cel-phone'}
          placeholder={'(00) 0000-0000'}
          iconName={'whatsapp'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          keyboardType='numeric'
          infoText={'Este número deve ser o seu WhatsApp'}
        />

        <RegisterLabel title='Endereço' />

        {/* input mascarado cep */}
        <ControlledInput
          isMasked
          control={control}
          name='cep'
          type={'custom'}
          options={{
            mask: '99999-999',
          }}
          placeholder='CEP'
          action={getAddressData}
          keyboardType='numeric'
        />

        <ControlledInput
          control={control}
          name='rua'
          placeholder='Rua'
          error={errors.rua}
        />

        <ControlledInput
          control={control}
          name='numero'
          placeholder='Número'
          error={errors.numero}
        />

        <ControlledInput
          control={control}
          name='complemento'
          placeholder='Complemento'
        />

        <ControlledInput
          control={control}
          name='bairro'
          error={errors.bairro}
          placeholder='Bairro'
        />

        <ControlledInput
          control={control}
          name='cidade'
          error={errors.cidade}
          isDisabled
          placeholder='Cidade'
        />

        <ControlledSelect
          control={control}
          name='estado'
          isSelectionInput={true}
          error={errors.estado}
        />

        <RegisterLabel title='Política de privacidade' />
        <AcceptCheck
          title={'os termos e condições'}
          contentTextType={'termos'}
          action={handleAcceptTerms}
        />
        <AcceptCheck
          title={'a política de privacidade'}
          contentTextType={'política'}
          action={handleAcceptPolicy}
        />
        {acceptTerms && acceptPolicy && (
          <Button
            bgColor={colors.blue[600]}
            height={54}
            width='90%'
            _pressed={{ bgColor: colors.blue[700] }}
            mt={4}
            borderRadius={15}
            alignSelf='center'
            onPress={handleSubmit(handleCreateUser)}
            isLoading={isLoading}
          >
            Cadastrar
          </Button>
        )}
        {Object.values(errors).length > 0 && (
          <Text
            alignSelf='center'
            color={colors.purple[500]}
            mt={4}
          >
            Verifique todos os campos antes de continuar
          </Text>
        )}
      </ScrollView>
    </VStack>
  )
}
