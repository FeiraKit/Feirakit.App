import React, { useState } from 'react';
import { Button, Text, VStack, useTheme, KeyboardAvoidingView, HStack } from 'native-base';
import { Alert, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { showMessage } from 'react-native-flash-message';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonBack } from '../../components/ButtonBack';
import ViaCep from '../../services/ViaCep';
import { LogoFeira } from '../../components/LogoFeira';
import { User } from '../../services/user';
import { InputLabel } from '../../components/FormComponents/InputLabel';
import { AcceptCheck } from '../../components/FormComponents/AcceptCheck';
import { UserAdressSchema } from '../../validationsSchemes/userValidations';
import { ControlledInput } from '../../components/FormComponents/controlledInput';
import { ControlledSelect } from '../../components/FormComponents/ControlledSelect';

export function UserAdress() {
  const user = new User();
  const route = useRoute();
  const navigation = useNavigation();
  const prevUser = route.params.user;
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);

  const handleAcceptPolicy = () => {
    setAcceptPolicy(!acceptPolicy);
  };
  const handleAcceptTerms = () => {
    setAcceptTerms(!acceptTerms);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(UserAdressSchema),
  });
  const Login = async (email, password) => {
    const userAuth = await (await user.checkPassword(email, password)).data;
    if (!userAuth.resultado) {
      setIsLoading(false);
      showMessage({
        message: 'Erro ao efetuar Login',
        type: 'danger',
      });
      return navigation.navigate('SignIn');
    }

    const jwtToken = userAuth.token;
    user.getUserByEmail(email, jwtToken);
    setIsLoading(false);
  };

  const handleCreateUser = async (data) => {
    setIsLoading(true);

    const objUser = {
      ...prevUser,
      endereco: {
        rua: data.rua,
        numero: data.numero,
        bairro: data.bairro,
        cep: data.cep,
        complemento: data.complemento,
        cidade: data.cidade,
        estado: data.estado,
      },
    };

    try {
      const createdUser = await user.createUser(objUser);
      if (!createdUser.data.resultado) {
        setIsLoading(false);
        return showMessage({
          message: 'Erro ao cadastrar usuário',
          type: 'danger',
        });
      }

      if (createdUser.data.resultado) {
        showMessage({ message: 'Bem Vindo ao Feira Kit', type: 'success' });
        Login(objUser.email, objUser.senha);
      }
    } catch (error) {
      setIsLoading(false);
      return Alert.alert('Erro', 'Tivemos um problema ao cadastrar o usuário');
    }
  };

  const getAddressData = async (cep) => {
    await ViaCep.get(`${cep}/json/`)
      .then(({ data }) => {
        setValue('estado', data.uf);
        setValue('cidade', data.localidade);
        setValue('bairro', data.bairro);
        setValue('rua', data.logradouro);
        setValue('complemento', data.complemento);
      })
      .catch((err) => console.log(err));
  };

  return (
    <TouchableWithoutFeedback touchSoundDisabled onPress={() => Keyboard.dismiss()}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <KeyboardAvoidingView behavior="padding" h="full" w="full" px="3%">
          <VStack w="full">
            <ButtonBack />
            <LogoFeira />
          </VStack>

          <VStack w="full">
            <Text fontFamily="body" fontSize={RFValue(22)} alignSelf="center">
              Cadastre-se no FeiraKit
            </Text>

            <InputLabel title="CEP" />
            <ControlledInput
              isMasked
              mt={RFValue(0)}
              control={control}
              name="cep"
              type="custom"
              options={{
                mask: '99999-999',
              }}
              placeholder="CEP"
              action={getAddressData}
              error={errors.cep}
              keyboardType="numeric"
            />
            <HStack w="full" pl={RFValue(1)}>
              <VStack w="65%">
                <InputLabel title="Rua" />
                <ControlledInput
                  mt={RFValue(0)}
                  control={control}
                  name="rua"
                  placeholder="Rua"
                  error={errors.rua}
                />
              </VStack>
              <VStack w="33%">
                <InputLabel title="Número" ml={RFValue(0)} />
                <ControlledInput
                  mt={RFValue(0)}
                  control={control}
                  name="numero"
                  placeholder="Número"
                  error={errors.numero}
                />
              </VStack>
            </HStack>
            <InputLabel title="Complemento" />
            <ControlledInput
              control={control}
              mt={RFValue(0)}
              name="complemento"
              placeholder="Complemento"
              error={errors.complemento}
            />
            <InputLabel title="Bairro" />
            <ControlledInput
              mt={RFValue(0)}
              control={control}
              name="bairro"
              error={errors.bairro}
              placeholder="Bairro"
            />
            <InputLabel title="Cidade" />
            <ControlledInput
              mt={RFValue(0)}
              control={control}
              name="cidade"
              error={errors.cidade}
              isDisabled
              placeholder="Cidade"
            />
            <InputLabel title="Estado" />
            <ControlledSelect
              mt={RFValue(0)}
              control={control}
              isSelectState
              name="estado"
              isSelectionInput
              error={errors.estado}
            />

            <InputLabel title="Política de privacidade" />
            <AcceptCheck
              title="os termos e condições"
              contentTextType="termos"
              action={handleAcceptTerms}
            />
            <AcceptCheck
              title="a política de privacidade"
              contentTextType="política"
              action={handleAcceptPolicy}
            />
            {acceptTerms && acceptPolicy && (
              <Button
                bgColor={colors.blue[600]}
                height={54}
                width="90%"
                _pressed={{ bgColor: colors.blue[700] }}
                mt={4}
                borderRadius={15}
                alignSelf="center"
                onPress={handleSubmit(handleCreateUser)}
                isLoading={isLoading}
              >
                Cadastrar
              </Button>
            )}
            {Object.values(errors).length > 0 && (
              <Text alignSelf="center" color={colors.purple[500]} mt={4}>
                Verifique todos os campos antes de continuar
              </Text>
            )}
          </VStack>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
