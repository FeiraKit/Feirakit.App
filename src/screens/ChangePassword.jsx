import React, { useState } from 'react';
import { VStack, Text, Input, useTheme, Icon, Button } from 'native-base';
import { Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ButtonBack } from '../components/ButtonBack';
import { LogoFeira } from '../components/LogoFeira';
import { User } from '../services/user';
import { Logout } from '../store/actions';

export function ChangePassword() {
  const user = new User();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const curentUser = useSelector((state) => state.AuthReducers.userData.userData);
  const [inputType, setInputType] = useState('password');
  const dispatch = useDispatch();
  const [incompatiblePassword, setIncompatiblePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userSchema = yup.object({
    email: yup.string().required('Informe um email válido').email('Informe um email válido'),

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
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handlePassword = async (data) => {
    setIsLoading(true);
    const imputData = {
      email: data.email,
      senha: data.senha,
      nova_senha: data.novaSenha,
    };
    if (data.novaSenha !== data.confirmacao) {
      setIncompatiblePassword(true);
      setIsLoading(false);
      return;
    }
    const result = await user.checkPassword(data.email, data.senha);

    if (!result) {
      setIsLoading(false);
      return Alert.alert('Erro', 'Um erro inesperado aconteceu,por favor tente novamente');
    }

    if (result && !result.resultado) {
      setIsLoading(false);
      setError(
        'auth',
        { type: 'custom', message: 'Verifique seu e-mail e senha' },
        { shouldFocus: true }
      );
      return Alert.alert(
        'Oops',
        'As informações de autenticação estão incorretas. Verifique seu e-mail e senha e tente novamente. '
      );
    }

    user
      .changePassword(JSON.stringify(imputData))
      .then(() => {
        showMessage({
          message: 'Senha alterada com sucesso',
          type: 'success',
        });
        logout(curentUser.nome);
        navigation.goBack();
      })
      .catch((error) => {
        if (error.response.data.mensagem) {
          return Alert.alert('Erro', error.response.data.mensagem);
        }
        return Alert.alert('Erro', 'Um erro inesperado aconteceu,tente novamente');
      });

    setIsLoading(false);
  };

  const changedPasswordText = {
    title: 'Senha alterada',
    description:
      'a sua senha foi alterada com sucesso, por segurança será necessário realizar login novamente.',
    optionYes: 'ok',
  };

  const logout = (nome) => {
    Alert.alert(
      changedPasswordText.title,
      `Olá ${nome.split(' ')[0]}, ${changedPasswordText.description}`,
      [
        {
          text: changedPasswordText.optionYes,
          onPress: () => {
            dispatch(Logout());
          },
        },
      ]
    );
  };

  function toggleVisibilityPassword() {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  }

  return (
    <VStack flex={1} w="full">
      <ButtonBack />
      <LogoFeira />
      <Text
        fontFamily="Montserrat_400Regular"
        alignSelf="flex-start"
        ml={4}
        color={colors.gray[900]}
        fontSize={20}
        mt={10}
      >
        Autenticação
      </Text>
      {errors.auth && (
        <Text alignSelf="flex-start" marginLeft={4} color={colors.purple[500]}>
          {errors.auth.message}
        </Text>
      )}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            mt={4}
            width={334}
            height={54}
            bgColor={colors.gray[100]}
            w="90%"
            alignSelf="center"
            keyboardType="email-address"
            color={errors.email ? colors.purple[500] : colors.blue[900]}
            leftElement={
              <Icon
                color={errors.email ? colors.purple[500] : colors.blue[900]}
                as={<MaterialIcons name="email" />}
                size={6}
                ml={2}
              />
            }
            placeholder="E-mail"
            fontFamily="Montserrat_400Regular"
            placeholderTextColor={errors.email ? colors.purple[500] : colors.blue[900]}
            fontSize={14}
            borderRadius={8}
            mr={4}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && (
        <Text alignSelf="flex-start" marginLeft={8} color={colors.purple[500]}>
          {errors.email.message}
        </Text>
      )}

      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, value } }) => (
          <Input
            mt={5}
            width={334}
            height={54}
            bgColor={colors.gray[100]}
            w="90%"
            color={errors.senha ? colors.purple[500] : colors.blue[900]}
            type={inputType}
            alignSelf="center"
            value={value}
            onChangeText={onChange}
            leftElement={
              <Icon
                color={errors.senha ? colors.purple[500] : colors.blue[900]}
                as={<MaterialIcons name="lock" />}
                size={6}
                ml={2}
              />
            }
            rightElement={
              <TouchableOpacity onPress={() => toggleVisibilityPassword()}>
                <Icon
                  color={colors.blue[900]}
                  as={
                    <MaterialIcons name={inputType === 'text' ? 'visibility-off' : 'visibility'} />
                  }
                  size={6}
                  marginRight={2}
                />
              </TouchableOpacity>
            }
            placeholder="Senha"
            fontFamily="Montserrat_400Regular"
            placeholderTextColor={errors.senha ? colors.purple[500] : colors.blue[900]}
            fontSize={14}
            borderRadius={8}
            mr={4}
          />
        )}
      />
      {errors.senha && (
        <Text alignSelf="flex-start" marginLeft={8} color={colors.purple[500]}>
          {errors.senha.message}
        </Text>
      )}

      <VStack>
        <Text
          fontFamily="Montserrat_400Regular"
          alignSelf="flex-start"
          ml={4}
          color={colors.gray[900]}
          fontSize={20}
          mt={10}
        >
          Alterar Senha
        </Text>

        {incompatiblePassword && (
          <Text color={colors.purple[500]} alignSelf="center" fontSize={16}>
            As senhas são incompatíveis
          </Text>
        )}

        <Controller
          control={control}
          name="novaSenha"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={5}
              type={inputType}
              width={334}
              height={54}
              bgColor={colors.gray[100]}
              w="90%"
              color={errors.novaSenha ? colors.purple[500] : colors.blue[900]}
              alignSelf="center"
              value={value}
              onChangeText={onChange}
              leftElement={
                <Icon
                  color={errors.novaSenha ? colors.purple[500] : colors.blue[900]}
                  as={<MaterialIcons name="lock" />}
                  size={6}
                  ml={2}
                />
              }
              placeholder="nova Senha"
              fontFamily="Montserrat_400Regular"
              rightElement={
                <TouchableOpacity onPress={() => toggleVisibilityPassword()}>
                  <Icon
                    color={colors.blue[900]}
                    as={
                      <MaterialIcons
                        name={inputType === 'text' ? 'visibility-off' : 'visibility'}
                      />
                    }
                    size={6}
                    marginRight={2}
                  />
                </TouchableOpacity>
              }
              placeholderTextColor={errors.novaSenha ? colors.purple[500] : colors.blue[900]}
              fontSize={14}
              borderRadius={8}
              mr={4}
            />
          )}
        />
        {errors.novaSenha && (
          <Text alignSelf="flex-start" marginLeft={8} color={colors.purple[500]}>
            {errors.novaSenha.message}
          </Text>
        )}

        <Controller
          control={control}
          name="confirmacao"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={5}
              width={334}
              height={54}
              bgColor={colors.gray[100]}
              w="90%"
              color={errors.confirmacao ? colors.purple[500] : colors.blue[900]}
              alignSelf="center"
              type={inputType}
              value={value}
              onChangeText={onChange}
              leftElement={
                <Icon
                  color={errors.confirmacao ? colors.purple[500] : colors.blue[900]}
                  as={<MaterialIcons name="lock" />}
                  size={6}
                  ml={2}
                />
              }
              rightElement={
                <TouchableOpacity onPress={() => toggleVisibilityPassword()}>
                  <Icon
                    color={colors.blue[900]}
                    as={
                      <MaterialIcons
                        name={inputType === 'text' ? 'visibility-off' : 'visibility'}
                      />
                    }
                    size={6}
                    marginRight={2}
                  />
                </TouchableOpacity>
              }
              placeholder="Confirmar Nova Senha"
              fontFamily="Montserrat_400Regular"
              placeholderTextColor={errors.confirmacao ? colors.purple[500] : colors.blue[900]}
              fontSize={14}
              borderRadius={8}
              mr={4}
            />
          )}
        />
        {errors.confirmacao && (
          <Text alignSelf="flex-start" marginLeft={8} color={colors.purple[500]}>
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
          w="90%"
          borderRadius={15}
          isLoading={isLoading}
          alignSelf="center"
          alignContent="center"
          alignItems="center"
        >
          <Text color={colors.gray[200]} fontFamily="Montserrat_400Regular" fontSize={15}>
            Confirmar
          </Text>
        </Button>
      </VStack>
    </VStack>
  );
}
