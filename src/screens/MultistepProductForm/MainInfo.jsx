import React from 'react'
import { ButtonBack } from '../../components/ButtonBack'
import { ProgressBar } from './components/ProgressBar'
import { LogoFeira } from '../../components/LogoFeira'
import { Text, VStack, useTheme } from 'native-base'
import { useSelector } from 'react-redux'
import { RFValue } from 'react-native-responsive-fontsize'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ControlledInput } from '../../components/FormComponents/controlledInput'
import { ControlledSelect } from '../../components/FormComponents/ControlledSelect'
import { InputLabel } from '../../components/FormComponents/InputLabel'
import { Product } from '../../services/product'
import * as Yup from 'yup'
import { LoadingForm } from '../../components/Loading'

export function MainInfo() {
  const productInstance = new Product()
  const user = useSelector((state) => state.AuthReducers.userData.userData)
  const { colors } = useTheme()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(),
  })
  const [categories, setCategories] = useState([])
  const [unities, setUnities] = useState([])
  const [FormLoaded, setFormLoaded] = useState(false)
  useEffect(() => {
    productInstance
      .getUnites()
      .then(({ data }) => {
        setCategories(data.categorias)
        console.log(categories)
        setUnities(data.unidades)
      })
      .catch((error) => console.log(error))

    // productInstance.getCities().then(async ({ data }) => {
    //   //  await setAllCities(data.resultado)
    // })

    setFormLoaded(true)
  }, [])

  return (
    <VStack
      flex={1}
      w='full'
      h='full'
      px={'3%'}
    >
      {!FormLoaded ? (
        <LoadingForm />
      ) : (
        <>
          <ButtonBack />
          <LogoFeira />
          <ProgressBar percent='20' />
          <Text
            fontFamily={'body'}
            fontSize={RFValue(22)}
          >
            Olá, {user.nome}!
          </Text>
          <Text
            fontFamily={'body'}
            fontSize={RFValue(22)}
            textAlign='left'
            textBreakStrategy='highQuality'
          >
            O que você está vendendo hoje?
          </Text>

          <InputLabel title={'Nome do Produto'} />
          <ControlledInput
            control={control}
            name='name'
            mt={1}
          />

          <InputLabel title={'Preço do Produto'} />
          <ControlledInput
            control={control}
            name='price'
            isMasked
            type={'money'}
            keyboardType={'numeric'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: '',
            }}
            mt={1}
          />
          <InputLabel title={'Categoria do produto'} />
          <ControlledSelect
            control={control}
            name='cotegory'
            selectItemsValue={categories}
            selectLabel={'Selcione a categoria'}
          />
        </>
      )}
    </VStack>
  )
}
