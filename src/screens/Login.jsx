import { useRef, useState } from 'react';
import { Button, Text, VStack, Icon, Input, useTheme, KeyboardAvoidingView } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Image, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { User } from '../services/user';

export function Login() {
  const navigation = useNavigation();
  const user = new User();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputType, setInputType] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const emailImputRef = useRef(null);
  const passwordImputRef = useRef(null);

  const submit = async () => {
    setIsLoading(true);
    if (email === '') {
      setIsLoading(false);
      emailImputRef.current.focus();
      return Alert.alert('Oops', 'por favor informe o seu email');
    }
    if (password === '') {
      setIsLoading(false);
      passwordImputRef.current.focus();
      return Alert.alert('Oops', 'por favor informe a sua senha');
    }

    const data = await user.checkPassword(email, password);

    if (!data) {
      setIsLoading(false);
      return Alert.alert(
        'Erro',
        'Encontramos um problema temporário. Agradecemos sua paciência, tente novamente em alguns instantes.'
      );
    }

    if (!data.resultado && data.mensagem === 'Senha inválida') {
      setIsLoading(false);
      passwordImputRef.current.focus();
      return Alert.alert('Ops!', 'Senha incorreta');
    }

    if (!data.resultado && data.mensagem === 'Email não cadastrado') {
      setIsLoading(false);
      emailImputRef.current.focus();
      return Alert.alert(
        'Usuário não encontrado',
        'Verifique se digitou o e-mail corretamente ou cadastre-se para continuar.'
      );
    }

    const jwtToken = data.token;
    setIsLoading(false);
    user.getUserByEmail(email, jwtToken);
  };

  function toggleVisibilityPassword() {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1, height: '100%', width: '98%', justifyContent: 'center' }}
    >
      <VStack alignItems="center" w="full" mb={10}>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 187, height: 170 }}
          resizeMode="contain"
        />
        <Text
          alignSelf="flex-start"
          color={colors.blue[600]}
          ml={4}
          fontFamily="heading"
          fontSize={RFValue(18)}
        >
          Bem Vindo
        </Text>
        <Input
          ref={emailImputRef}
          onChangeText={setEmail}
          mt={4}
          height={54}
          alignSelf="center"
          w="94%"
          bgColor={colors.gray[100]}
          color={colors.blue[900]}
          leftElement={
            <Icon color={colors.blue[700]} as={<MaterialIcons name="person" />} size={6} ml={2} />
          }
          placeholder="Digite o seu email"
          fontFamily="Montserrat_500Medium"
          placeholderTextColor={colors.blue[700]}
          fontSize={14}
          keyboardType="email-address"
          borderRadius={8}
          autoCapitalize="none"
        />
        <Input
          ref={passwordImputRef}
          type={inputType}
          onChangeText={setPassword}
          mt={4}
          height={54}
          alignSelf="center"
          w="94%"
          bgColor={colors.gray[100]}
          color={colors.blue[900]}
          leftElement={
            <Icon color={colors.blue[700]} as={<MaterialIcons name="lock" />} size={6} ml={2} />
          }
          rightElement={
            <TouchableOpacity onPress={() => toggleVisibilityPassword()}>
              <Icon
                color={colors.blue[700]}
                as={<MaterialIcons name={inputType === 'text' ? 'visibility-off' : 'visibility'} />}
                size={6}
                marginRight={2}
              />
            </TouchableOpacity>
          }
          placeholder="Senha"
          fontFamily="Montserrat_500Medium"
          placeholderTextColor={colors.blue[700]}
          fontSize={14}
          borderRadius={8}
          autoCapitalize="none"
        />
        <VStack w="94%" alignItems="flex-start" mt={2} mb={4}>
          <TouchableOpacity mt={6} onPress={() => navigation.navigate('PasswordRecovery')}>
            <Text>Esqueci minha senha</Text>
          </TouchableOpacity>
        </VStack>
        <Button
          bgColor={colors.blue[600]}
          _pressed={{ bgColor: colors.blue[700] }}
          onPress={submit}
          height={54}
          mt={4}
          w="90%"
          borderRadius={15}
          isLoading={isLoading}
        >
          Entrar
        </Button>
        <Button
          onPress={() => navigation.navigate('Register')}
          height={54}
          mt={4}
          w="90%"
          borderRadius={15}
        >
          Cadastre-se
        </Button>
      </VStack>

      <VStack w="full" alignItems="center">
        <Button
          bgColor={colors.gray[200]}
          _text={{ color: colors.blue[600], fontSize: 'md' }}
          w="90%"
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
    </KeyboardAvoidingView>
  );
}
