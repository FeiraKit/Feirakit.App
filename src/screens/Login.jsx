import React, { useState } from 'react'
import { Button, Text, VStack, Icon, Input, useTheme } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { Image, Alert, TouchableOpacity } from 'react-native'
import { User } from '../services/user'
import { useNavigation } from '@react-navigation/native'

export function Login() {
  const navigation = useNavigation()
  const user = new User()
  const { colors } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inputType, setInputType] = useState('password')
  const [isLoading, setIsLoading] = useState(false)

  const submit = async () => {
    setIsLoading(true)
    if (email === '' || password === '') {
      setIsLoading(false)
      return Alert.alert('Erro', 'por favor preencha todos os campos')
    }

    await user
      .checkPassword(email, password)
      .then(({ data }) => {
        if (!data.resultado) {
          setIsLoading(false)
          return Alert.alert('Erro', 'Usuário ou senha inválidos')
        }
        let jwtToken = data.token
        setIsLoading(false)
        user.getUserByEmail(email, jwtToken)
      })
      .catch((error) => {
        setIsLoading(false)
        if (!error.response.data.resultado) {
          return Alert.alert('Erro', 'Usuário ou senha inválidos')
        }
        return Alert.alert(
          'Erro',
          'Um erro inesperado aconteceu,tente novamente'
        )
      })
  }

  function handleVisibilityPassword() {
    if (inputType == 'password') {
      setInputType('text')
    } else {
      setInputType('password')
    }
  }

  return (
    <VStack
      h='full'
      w='full'
      justifyContent={'space-evenly'}
    >
      <VStack
        alignItems='center'
        w='full'
        mb={10}
      >
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 187, height: 170 }}
          resizeMode='contain'
        />
        <Text
          alignSelf='flex-start'
          color={colors.blue[600]}
          ml={4}
          fontFamily='heading'
        >
          Bem Vindo
        </Text>
        <Input
          onChangeText={setEmail}
          mt={4}
          height={54}
          alignSelf='center'
          w='94%'
          bgColor={colors.gray[100]}
          color={colors.blue[900]}
          leftElement={
            <Icon
              color={colors.blue[700]}
              as={<MaterialIcons name='person' />}
              size={6}
              ml={2}
            />
          }
          placeholder='Digite o seu email'
          fontFamily={'Montserrat_500Medium'}
          placeholderTextColor={colors.blue[700]}
          fontSize={14}
          borderRadius={8}
          autoCapitalize='none'
        />
        <Input
          type={inputType}
          onChangeText={setPassword}
          mt={4}
          height={54}
          alignSelf='center'
          w='94%'
          bgColor={colors.gray[100]}
          color={colors.blue[900]}
          leftElement={
            <Icon
              color={colors.blue[700]}
              as={<MaterialIcons name='lock' />}
              size={6}
              ml={2}
            />
          }
          rightElement={
            <TouchableOpacity onPress={handleVisibilityPassword}>
              <Icon
                color={colors.blue[700]}
                as={
                  <MaterialIcons
                    name={inputType == 'text' ? 'visibility-off' : 'visibility'}
                  />
                }
                size={6}
                marginRight={2}
              />
            </TouchableOpacity>
          }
          placeholder='Senha'
          fontFamily={'Montserrat_500Medium'}
          placeholderTextColor={colors.blue[700]}
          fontSize={14}
          borderRadius={8}
          autoCapitalize='none'
        />
        <Button
          bgColor={colors.blue[600]}
          _pressed={{ bgColor: colors.blue[700] }}
          onPress={submit}
          height={54}
          mt={4}
          w='90%'
          borderRadius={15}
          isLoading={isLoading}
        >
          Entrar
        </Button>
        <Button
          onPress={() => navigation.navigate('Register')}
          height={54}
          mt={4}
          w='90%'
          borderRadius={15}
        >
          Cadastre-se
        </Button>
        <Button
          bgColor={colors.gray[200]}
          _text={{ color: colors.blue[600], fontSize: 'md' }}
          height={54}
          mt={4}
          w='90%'
          borderRadius={15}
          onPress={() => navigation.navigate('PasswordRecovery')}
        >
          Esqueci minha senha
        </Button>
      </VStack>
      <VStack
        w='full'
        alignItems='center'
      >
        <Button
          bgColor={colors.gray[200]}
          _text={{ color: colors.blue[600], fontSize: 'md' }}
          w='90%'
          borderRadius={15}
          onPress={() =>
            navigation.navigate('PolicyAndTerms', {
              contentTextType: 'política',
            })
          }
        >
          Política de privacidade
        </Button>
        <Text color={colors.gray[400]}>Feira-Kit © 2023</Text>
      </VStack>
    </VStack>
  )
}
