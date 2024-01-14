import { HStack, Text, VStack, useTheme } from 'native-base'
import React from 'react'
import { ButtonBack } from '../components/ButtonBack'
import { LogoFeira } from '../components/LogoFeira'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation, useRoute } from '@react-navigation/native'

export function EditProduct() {
  const route = useRoute()
  const { colors } = useTheme()
  const prevProduct = route.params.produto
  console.log(prevProduct)

  return (
    <VStack
      w='full'
      h='full'
      px={'3%'}
    >
      <ButtonBack />
      <LogoFeira />
      <Text
        fontFamily={'body'}
        fontSize={RFValue(22)}
        textAlign={'center'}
      >
        Editar Produto
      </Text>
    </VStack>
  )
}
