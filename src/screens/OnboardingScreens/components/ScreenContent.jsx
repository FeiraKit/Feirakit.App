import React from 'react'
import { VStack, Image, Text, useTheme, Button, Heading } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { OnboardTitle } from './onboardTitle'
import { StepIndicator } from './StepIndicator'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function ScreenContent({
  urlImage,
  ScreenTitle,
  BtnText,
  NextPage,
  TextDescription,
  PageActive,
}) {
  const navigation = useNavigation()
  const { colors } = useTheme()

  const SaveIfUserAlreadyUsedTheApp = async () => {
    await AsyncStorage.setItem('UserAlreadyUsed', 'true')
  }

  return (
    <VStack
      flex={1}
      justifyContent='center'
      alignItems='center'
      w='full'
    >
      <Image
        source={urlImage}
        resizeMode='contain'
        alt={TextDescription}
      />
      <OnboardTitle title={ScreenTitle} />
      <Text
        fontSize={RFValue(12)}
        mx={'2%'}
        mt={4}
        color={colors.gray[450]}
        mb={2}
        textAlign='center'
      >
        {TextDescription}
      </Text>
      <StepIndicator active={PageActive} />
      <Button
        height={50}
        mt={150}
        w='80%'
        bgColor={colors.blue[900]}
        _pressed={{ bgColor: colors.blue[700] }}
        borderRadius={50}
        onPress={() => {
          if (BtnText == 'Iniciar') {
            SaveIfUserAlreadyUsedTheApp()
          }
          navigation.navigate(NextPage)
        }}
      >
        <Text
          color={colors.gray[100]}
          fontWeight='semibold'
        >
          {BtnText}
        </Text>
      </Button>
    </VStack>
  )
}
