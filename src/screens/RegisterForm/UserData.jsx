import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, Text, VStack, useTheme } from 'native-base';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonBack } from '../../components/ButtonBack';
import { LogoFeira } from '../../components/LogoFeira';
import { InputLabel } from '../../components/FormComponents/InputLabel';
import { UserDataSchema } from '../../validationsSchemes/userValidations';
import { ControlledInput } from '../../components/FormComponents/controlledInput';
import { removeNumberMask } from '../../utils/removeMasks';
import { User } from '../../services/user';

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
    const telefone = await removeNumberMask(data.telefone);
    const objUser = {
      email: data.email,
      nome: data.nome,
      senha: data.senha,
      telefone,
    };
    try {
      user
        .checkPassword(objUser.email, objUser.senha)
        // eslint-disable-next-line no-shadow
        .then(({ data }) => {
          if (data.resultado) {
            setError('email', {
              type: 'custom',
              message: 'Este e-mail já está sendo usado',
            });
            setIsLoading(false);
            return Alert.alert('Erro', 'Este endereço de e-mail já está sendo usado');
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response) {
            if (!error.response.data.resultado) {
              return navigation.navigate('AddAdress', { user: objUser });
            }
          }
          return Alert.alert('Erro', 'Tivemos um problema,tente novamente');
        });
    } catch (error) {
      return Alert.alert(
        'Erro',
        'Tivemos um problema, por favor,feche o aplicativo e tente novamente '
      );
    }
  };

  return (
    <TouchableWithoutFeedback touchSoundDisabled onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="padding" h="full" w="full" flex={1} px="3%">
        <VStack w="full" h="1/6">
          <ButtonBack />
          <LogoFeira />
        </VStack>

        <VStack w="full" h="5/6">
          <Text fontFamily="body" fontSize={RFValue(22)} alignSelf="center">
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
          <InputLabel title="E-mail" />
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

          <InputLabel mt={RFValue(2)} title="Telefone" />
          <ControlledInput
            mt={RFValue(1)}
            isMasked
            control={control}
            name="telefone"
            error={errors.telefone}
            type="cel-phone"
            placeholder="(00) 0000-0000"
            iconName="whatsapp"
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
            keyboardType="numeric"
            infoText="Este número deve ser o seu WhatsApp"
          />

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
