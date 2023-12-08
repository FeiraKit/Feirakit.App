import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Button,
  KeyboardAvoidingView,
  Text,
  VStack,
  useTheme,
} from 'native-base'
import { ProgressBar } from './components/ProgressBar'
import React from 'react'
import { ButtonBack } from '../../components/ButtonBack'
import { yupResolver } from '@hookform/resolvers/yup'
import { LogoFeira } from '../../components/LogoFeira'
import { RFValue } from 'react-native-responsive-fontsize'
import { InputLabel } from '../../components/FormComponents/InputLabel'
import { ControlledInput } from '../../components/FormComponents/controlledInput'
import { useForm } from 'react-hook-form'
import { descriptionSchema } from '../../validationsSchemes/productValidations'
import { CustonCheckbox } from '../../components/FormComponents/CustonCheckbox'
import { useEffect } from 'react'
import { useState } from 'react'

export function DescriptionProduct() {
  const route = useRoute()
  const navigation = useNavigation()
  const { colors } = useTheme()
  const prevProduct = route.params.produto
  const [isBestBeforeAvaliable, setIsBestBeforeAvailable] = useState(false)
  const [bestBefore, setBestBefore] = useState(false)

  const handleCheckBestBefore = () => {
    setBestBefore(!bestBefore)
  }
  const handleCheckInfo = (data) => {
    prevProduct.descricao = data.descricao
    prevProduct.bestbefore = bestBefore
    navigation.navigate('AddCities', { produto: prevProduct })
  }

  useEffect(() => {
    let notAvaliableCategories = [
      'artesanato',
      'laticínios',
      'produtos naturais',
    ]
    if (!notAvaliableCategories.includes(prevProduct.categoria)) {
      setIsBestBeforeAvailable(true)
    }
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(descriptionSchema),
  })

  return (
    <VStack
      w='full'
      h='full'
      px={'3%'}
    >
      <VStack h='1/6'>
        <ButtonBack />
        <LogoFeira />
        <ProgressBar percent='40' />

        <Text
          fontFamily={'body'}
          fontSize={RFValue(22)}
        >
          Fale mais sobre o produto
        </Text>
      </VStack>

      <KeyboardAvoidingView
        behavior='height'
        h={'4/6'}
        pt={10}
        keyboardVerticalOffset={RFValue(60)}
      >
        <ControlledInput
          control={control}
          multiline
          name='descricao'
          mt={RFValue(8)}
          placeholder={'Descrição'}
          bgColor={colors.gray[250]}
          h={'3/5'}
          textAlignVertical='top'
          error={errors.descricao}
        />
        {isBestBeforeAvaliable && (
          <CustonCheckbox
            label={'O produto será colhido após a compra'}
            onChange={handleCheckBestBefore}
          />
        )}
      </KeyboardAvoidingView>
      <VStack h={'1/6'}>
        <Button
          alignSelf={'center'}
          w='98%'
          mt={8}
          _pressed={{ bgColor: colors.blue[700] }}
          borderRadius={8}
          onPress={handleSubmit(handleCheckInfo)}
        >
          <Text
            color={colors.gray[100]}
            fontWeight='semibold'
            fontFamily={'body'}
            fontSize={RFValue(18)}
          >
            Continuar
          </Text>
        </Button>
      </VStack>
    </VStack>
  )
}
