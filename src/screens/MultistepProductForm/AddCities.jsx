import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
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
import {
  addCitiesSchema,
  descriptionSchema,
} from '../../validationsSchemes/productValidations'
import { CustonCheckbox } from '../../components/FormComponents/CustonCheckbox'
import { useEffect } from 'react'
import { useState } from 'react'
import { CityItem } from './components/CityItem'
import { AddCityButton } from './components/AddCityButton'

export function AddCities() {
  const route = useRoute()
  const navigation = useNavigation()
  const { colors } = useTheme()
  const prevProduct = route.params.produto
  const [isCitiesLoaded, setIsCitiesLoaded] = useState(false)
  const [selectedCities, setSelectedCities] = useState([])

  // const handleCheckInfo = (data) => {
  //   prevProduct.descricao = data.descricao
  //   prevProduct.bestbefore = bestBefore
  //   navigation.navigate('AddCities', { produto: prevProduct })
  // }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCitiesSchema),
  })
  const handleCheckInfo = (data) => {
    prevProduct.cidades = data.data
    console.log(prevProduct)
    // navigation.navigate('AddCities', { produto: prevProduct })
  }

  useEffect(() => {
    // productInstance.getCities().then(async ({ data }) => {
    //   await setAllCities(data.resultado)
    // })
    console.log(prevProduct)

    setIsCitiesLoaded(true)
  }, [])

  return (
    <VStack
      w='full'
      h='full'
      px={'3%'}
    >
      <VStack h={'2/6'}>
        <ButtonBack />
        <LogoFeira />
        <ProgressBar percent='40' />
        <Text
          fontFamily={'body'}
          fontSize={RFValue(22)}
          textAlign={'left'}
        >
          Onde o produto estará disponível?
        </Text>
      </VStack>

      <VStack
        h={'3/6'}
        pb={'10'}
      >
        <VStack pb={4}>
          <FlatList
            data={selectedCities}
            keyExtractor={(city) => city}
            renderItem={({ index }) => (
              <CityItem city={selectedCities[index]} />
            )}
          />
        </VStack>
        <AddCityButton />
      </VStack>

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
