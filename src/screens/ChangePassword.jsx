import React, { useState } from 'react'
import { VStack, Text, Input, useTheme, Icon, Button } from 'native-base'
import { Alert } from 'react-native'
import { ButtonBack } from '../components/ButtonBack'
import { LogoFeira } from '../components/LogoFeira'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../store/actions'
import { showMessage } from 'react-native-flash-message'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { User } from '../services/user'
import * as yup from 'yup'

export function ChangePassword() {
  const user = new User()
  const navigation = useNavigation()
  const { colors } = useTheme()
  const curentUser = useSelector(
    (state) => state.AuthReducers.userData.userData
  )
  const dispatch = useDispatch()
  const [incompatiblePassword, setIncompatiblePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const userSchema = yup.object({
    email: yup
      .string()
      .required('Informe um email válido')
      .email('Informe um email válido'),

    senha: yup
      .string()
      .min(6, 'a senha deve ter pelo menos 6 dígitos')
      .required('informe a sua senha atual'),
    novaSenha: yup
      .string()
      .min(6, 'a senha deve ter pelo menos 6 dígitos')
      .required('informe uma nova senha'),
    confirmacao: yup
      .string()
      .min(6, 'a senha deve ter pelo menos 6 dígitos')
      .required('reescreva a nova senha'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(userSchema),
  })

  const handlePassword = async (data) => {
    setIsLoading(true)
    const imputData = {
      email: data.email,
      senha: data.senha,
      nova_senha: data.novaSenha,
    }
    if (data.novaSenha !== data.confirmacao) {
      setIncompatiblePassword(true)
      setIsLoading(false)
      return
    }
    await user
      .checkPassword(data.email, data.senha)
      .then(({ data }) => {
        if (data.resultado) {
          user
            .changePassword(JSON.stringify(imputData))
            .then(() => {
              showMessage({
                message: 'Senha alterada com sucesso',
                type: 'success',
              })
              logout(curentUser.nome)
              navigation.goBack()
            })
            .catch((error) => {
              console.log(error.response.data)
              if (error.response.data.mensagem) {
                return Alert.alert('Erro', error.response.data.mensagem)
              }

              return Alert.alert(
                'Erro',
                'Um erro inesperado aconteceu,tente novamente'
              )
            })
        }
      })
      .catch((error) => {
        if (error.response.data.mensagem) {
          setError(
            'senha',
            { type: 'custom', message: 'senha inválida' },
            { shouldFocus: true }
          )
          return Alert.alert('Erro', error.response.data.mensagem)
        }
        return Alert.alert(
          'Erro',
          'Um erro inesperado aconteceu,tente novamente'
        )
      })
    setIsLoading(false)
  }

  const changedPasswordText = {
    title: 'Senha alterada',
    description:
      'a sua senha foi alterada com sucesso, por segurança será necessário realizar login novamente.',
    optionYes: 'ok',
  }

  const logout = (nome) => {
    Alert.alert(
      changedPasswordText.title,
      `Olá ${nome.split(' ')[0]}, ${changedPasswordText.description}`,
      [
        {
          text: changedPasswordText.optionYes,
          onPress: () => {
            dispatch(Logout())
          },
        },
      ]
    )
  }

  return (
    <VStack
      flex={1}
      w='full'
    >
      <ButtonBack />
      <LogoFeira />
      <Text
        fontFamily={'Montserrat_400Regular'}
        alignSelf='flex-start'
        ml={4}
        color={colors.gray[900]}
        fontSize={20}
        mt={10}
      >
        Autenticação
      </Text>

      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value } }) => (
          <Input
            mt={4}
            width={334}
            height={54}
            bgColor={colors.gray[100]}
            w='90%'
            alignSelf='center'
            keyboardType='email-address'
            color={errors.email ? colors.purple[500] : colors.blue[900]}
            leftElement={
              <Icon
                color={errors.email ? colors.purple[500] : colors.blue[900]}
                as={<MaterialIcons name='email' />}
                size={6}
                ml={2}
              />
            }
            placeholder='E-mail'
            fontFamily={'Montserrat_400Regular'}
            placeholderTextColor={
              errors.email ? colors.purple[500] : colors.blue[900]
            }
            fontSize={14}
            borderRadius={8}
            mr={4}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && (
        <Text
          alignSelf='flex-start'
          marginLeft={8}
          color={colors.purple[500]}
        >
          {errors.email.message}
        </Text>
      )}

      <Controller
        control={control}
        name='senha'
        render={({ field: { onChange, value } }) => (
          <Input
            mt={5}
            width={334}
            height={54}
            bgColor={colors.gray[100]}
            w='90%'
            color={errors.senha ? colors.purple[500] : colors.blue[900]}
            type='password'
            alignSelf='center'
            value={value}
            onChangeText={onChange}
            leftElement={
              <Icon
                color={errors.senha ? colors.purple[500] : colors.blue[900]}
                as={<MaterialIcons name='lock' />}
                size={6}
                ml={2}
              />
            }
            placeholder='Senha'
            fontFamily={'Montserrat_400Regular'}
            placeholderTextColor={
              errors.senha ? colors.purple[500] : colors.blue[900]
            }
            fontSize={14}
            borderRadius={8}
            mr={4}
          />
        )}
      />
      {errors.senha && (
        <Text
          alignSelf='flex-start'
          marginLeft={8}
          color={colors.purple[500]}
        >
          {errors.senha.message}
        </Text>
      )}

      <VStack>
        <Text
          fontFamily={'Montserrat_400Regular'}
          alignSelf='flex-start'
          ml={4}
          color={colors.gray[900]}
          fontSize={20}
          mt={10}
        >
          Alterar Senha
        </Text>

        {incompatiblePassword && (
          <Text
            color={colors.purple[500]}
            alignSelf='center'
            fontSize={16}
          >
            As senhas são incompatíveis
          </Text>
        )}

        <Controller
          control={control}
          name='novaSenha'
          render={({ field: { onChange, value } }) => (
            <Input
              mt={5}
              type='password'
              width={334}
              height={54}
              bgColor={colors.gray[100]}
              w='90%'
              color={errors.novaSenha ? colors.purple[500] : colors.blue[900]}
              alignSelf='center'
              value={value}
              onChangeText={onChange}
              leftElement={
                <Icon
                  color={
                    errors.novaSenha ? colors.purple[500] : colors.blue[900]
                  }
                  as={<MaterialIcons name='lock' />}
                  size={6}
                  ml={2}
                />
              }
              placeholder='nova Senha'
              fontFamily={'Montserrat_400Regular'}
              placeholderTextColor={
                errors.novaSenha ? colors.purple[500] : colors.blue[900]
              }
              fontSize={14}
              borderRadius={8}
              mr={4}
            />
          )}
        />
        {errors.novaSenha && (
          <Text
            alignSelf='flex-start'
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.novaSenha.message}
          </Text>
        )}

        <Controller
          control={control}
          name='confirmacao'
          render={({ field: { onChange, value } }) => (
            <Input
              mt={5}
              width={334}
              height={54}
              bgColor={colors.gray[100]}
              w='90%'
              color={errors.confirmacao ? colors.purple[500] : colors.blue[900]}
              alignSelf='center'
              type='password'
              value={value}
              onChangeText={onChange}
              leftElement={
                <Icon
                  color={
                    errors.confirmacao ? colors.purple[500] : colors.blue[900]
                  }
                  as={<MaterialIcons name='lock' />}
                  size={6}
                  ml={2}
                />
              }
              placeholder='Confirmar Nova Senha'
              fontFamily={'Montserrat_400Regular'}
              placeholderTextColor={
                errors.confirmacao ? colors.purple[500] : colors.blue[900]
              }
              fontSize={14}
              borderRadius={8}
              mr={4}
            />
          )}
        />
        {errors.confirmacao && (
          <Text
            alignSelf='flex-start'
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.confirmacao.message}
          </Text>
        )}

        <Button
          bgColor={colors.blue[600]}
          _pressed={{ bgColor: colors.blue[700] }}
          width={334}
          height={54}
          onPress={handleSubmit(handlePassword)}
          mt={10}
          w='90%'
          borderRadius={15}
          isLoading={isLoading}
          alignSelf='center'
          alignContent='center'
          alignItems='center'
        >
          <Text
            color={colors.gray[200]}
            fontFamily={'Montserrat_400Regular'}
            fontSize={15}
          >
            Confirmar
          </Text>
        </Button>
      </VStack>
    </VStack>
  )
}
