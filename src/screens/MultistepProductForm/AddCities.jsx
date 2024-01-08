import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, FlatList, Text, VStack, useTheme } from 'native-base'
import { ProgressBar } from './components/ProgressBar'
import React, { useCallback, useRef } from 'react'
import { ButtonBack } from '../../components/ButtonBack'
import { LogoFeira } from '../../components/LogoFeira'
import { RFValue } from 'react-native-responsive-fontsize'
import { useEffect } from 'react'
import { useState } from 'react'
import { CityItem } from './components/CityItem'
import { AddCityButton } from './components/AddCityButton'
import BottomSheetBase from './components/BottomSheetBase'
import { useSelector } from 'react-redux'
import { CustonSelectionMany } from '../../components/FormComponents/CustonSelectionMany'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function AddCities() {
  const route = useRoute()
  const navigation = useNavigation()
  const currentUser = useSelector(
    (state) => state.AuthReducers.userData.userData
  )
  const { colors } = useTheme()
  const prevProduct = route.params.produto
  const [isCitiesLoaded, setIsCitiesLoaded] = useState(false)
  const allCities = [
    { nome: 'buriti' },
    { nome: 'gangorra' },
    { nome: 'Abaeté' },
    { nome: 'Bocaiúva' },
    { nome: 'Carangola' },
    { nome: 'Dores do Indaiá' },
    { nome: 'Espera Feliz' },
    { nome: 'Francisco Sá' },
    { nome: 'Guaxupé' },
    { nome: 'Itabirito' },
    { nome: 'Janaúba' },
    { nome: 'Lavras' },
    { nome: 'Muzambinho' },
    { nome: 'Nanuque' },
    { nome: 'Oliveira' },
    { nome: 'Piumhi' },
    { nome: 'São Gotardo' },
  ]
  const [selectedCities, setSelectedCities] = useState([
    currentUser.endereco.cidade,
  ])
  const [error, setError] = useState(false)

  const handleCheckInfo = () => {
    if (selectedCities.length === 0) {
      setError(true)
      return
    }
    prevProduct.cidades = selectedCities
    navigation.navigate('AddImages', { produto: prevProduct })
  }

  useEffect(() => {
    //logica para carregar todas as cidades
    //allCities = AsyncStorage.getItem('allCities')
    setIsCitiesLoaded(true)
  }, [])

  const bottomSheetRef = useRef(BottomSheetBase)

  const openActionsSheet = useCallback(async () => {
    bottomSheetRef.current?.snapToIndex(1)
  }, [])
  const closeActionsSheet = () => {
    bottomSheetRef.current?.close()
  }

  const handleSelectCities = (cities) => {
    setSelectedCities(cities)
    closeActionsSheet()
  }

  return (
    <VStack
      w='full'
      h='full'
      px={'3%'}
    >
      <VStack h={'2/6'}>
        <ButtonBack />
        <LogoFeira />
        <ProgressBar percent='75' />
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
        <AddCityButton action={openActionsSheet} />
        {error && (
          <Text
            alignSelf='flex-start'
            marginLeft={8}
            color={colors.purple[500]}
          >
            Informe pelo menos uma cidade
          </Text>
        )}
      </VStack>

      <VStack h={'1/6'}>
        <Button
          alignSelf={'center'}
          disabled={error}
          w='98%'
          mt={8}
          _pressed={{ bgColor: colors.blue[700] }}
          borderRadius={8}
          onPress={handleCheckInfo}
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

      <BottomSheetBase
        ref={bottomSheetRef}
        PanDownToClose={false}
      >
        <CustonSelectionMany
          cities={allCities}
          selectedCities={[...selectedCities]}
          handleCities={handleSelectCities}
        />
      </BottomSheetBase>
    </VStack>
  )
}
