import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, Text, VStack, useTheme } from 'native-base';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
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

export function UserContact() {
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
    }

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
                isDisabled={isLoading}
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
    </TouchableWithoutFeedback>
  );
}