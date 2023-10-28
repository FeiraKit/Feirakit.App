import React from 'react'
import { VStack, Center, Image, Text, Button, useTheme } from 'native-base'
import { useNavigation } from '@react-navigation/native'

export function Onboarding2() {
  const navigation = useNavigation()
  const { colors } = useTheme()
  return (
    <VStack
      flex={1}
      w='full'
    >
      <Center mt='1/2'>
        <Image
          source={require('./assets/Foto2.png')}
          style={{ width: 230, height: 281 }}
          resizeMode='contain'
          alt='Homem Comprando por aplicativo'
        />
        <Text
          fontSize={25}
          mt={4}
          ml={4}
          color={colors.black[500]}
        >
          Facilidade na sua mão
        </Text>
        <Text
          fontSize={15}
          mt={4}
          ml={4}
          color={colors.gray[400]}
          mb={2}
        >
          Facilite suas compras diárias e apoie produtores locais.
        </Text>
        <Button
          onPress={() => navigation.navigate('Onboarding3')}
          height={50}
          mt={150}
          w='80%'
          borderRadius={50}
        >
          Continue
        </Button>
      </Center>
    </VStack>
  )
}
