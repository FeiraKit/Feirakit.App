import React, { useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, ScrollView, Text, VStack, useTheme } from 'native-base';
import { Alert, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonBack } from '../../components/ButtonBack';
import { LogoFeira } from '../../components/LogoFeira';
import { InputLabel } from '../../components/FormComponents/InputLabel';
import { UserDataSchema } from '../../validationsSchemes/userValidations';
import { ControlledInput } from '../../components/FormComponents/controlledInput';
import { User } from '../../services/user';
import { StepIndicator } from '../OnboardingScreens/components/StepIndicator';

export function UserData() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const user = new User();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(UserDataSchema),
  });

  const handleCreateUser = async (data) => {
    setIsLoading(true);
    const objUser = {
      email: data.email,
      nome: data.nome,
      senha: data.senha,
    };

    const result = await user.checkPassword(objUser.email, objUser.senha);

    if (!result) {
      setIsLoading(false);
      return Alert.alert(
        'Erro',
        'Tivemos um problema, por favor,feche o aplicativo e tente novamente '
      );
    }

    if (result.resultado || result.mensagem === 'Senha inválida') {
      setIsLoading(false);
      setError('email', {
        type: 'custom',
        message: 'Este e-mail já está sendo usado',
      });
      return Alert.alert(
        'Conta existente',
        'Este e-mail já está cadastrado. Tente outro ou faça login.'
      );
    }
    setIsLoading(false);
    return navigation.navigate('AddAdress', { user: objUser });
  };

  useEffect(() => {
    if (errors) {
      Keyboard.dismiss();
    }
  }, [errors]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, height: '100%', width: '100%' }}
        mt="2"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
        >
          <VStack w="full">
            <ButtonBack />
            <LogoFeira />
            <StepIndicator quantitySteps={3} active={1} mt={-5} />
          </VStack>

          <Text fontFamily="body" fontSize={RFValue(18)} alignSelf="center">
            Cadastre-se no FeiraKit
          </Text>

          <InputLabel mt={RFValue(3)} title="Nome" />
          <ControlledInput
            mt={RFValue(1)}
            control={control}
            name="nome"
            placeholder="Nome"
            error={errors.nome}
            iconName="person"
          />
          <InputLabel title="E-mail" mt={RFValue(3)} />
          <ControlledInput
            control={control}
            name="email"
            mt={RFValue(1)}
            iconName="email"
            placeholder="E-mail"
            infoText="Informe um E-mail ativo"
            error={errors.email}
            keyboardType="email-address"
          />
          <InputLabel mt={RFValue(2)} title="Senha" />
          <ControlledInput
            mt={RFValue(1)}
            control={control}
            error={errors.senha}
            isPassword
            name="senha"
            iconName="lock"
            placeholder="Senha"
          />

          <InputLabel mt={RFValue(2)} title="confirme sua senha" />
          <ControlledInput
            mt={RFValue(1)}
            control={control}
            error={errors.confirmarSenha}
            isPassword
            name="confirmarSenha"
            iconName="lock"
            placeholder="confirme sua senha"
          />
        </ScrollView>
        <VStack px="4" pb={Platform.OS === 'ios' ? 10 : 8}>
          <Button
            bgColor={colors.blue[600]}
            height={54}
            width="90%"
            _pressed={{ bgColor: colors.blue[700] }}
            mt={6}
            borderRadius={15}
            alignSelf="center"
            onPress={handleSubmit(handleCreateUser)}
            isLoading={isLoading}
          >
            Continuar
          </Button>
        </VStack>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
