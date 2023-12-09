import React, { useState } from 'react'
import { Button, VStack, HStack, Heading, useTheme } from 'native-base'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { RFValue } from 'react-native-responsive-fontsize'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export function CustonSelectionMany({ selectedCities, cities, handleCities }) {
  const [selected, setSelected] = useState([...selectedCities])
  const { colors } = useTheme()

  function toggle(nome) {
    let index = selected.findIndex((i) => i === nome)
    let selectedsArray = [...selected]
    if (index !== -1) {
      selectedsArray.splice(index, 1)
    } else {
      selectedsArray.push(nome)
    }
    setSelected(selectedsArray)
  }

  return (
    <VStack>
      <VStack
        position={'relative'}
        h={'5/6'}
        paddingX={RFValue(4)}
      >
        <BottomSheetFlatList
          data={cities}
          keyExtractor={(city) => city.nome}
          renderItem={({ index }) => (
            <HStack
              flex={1}
              width='100%'
              mt={2}
            >
              <TouchableOpacity
                style={{
                  width: '100%',
                  marginVertical: 2,
                  flexDirection: 'row',
                  paddingVertical: 2,
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: colors.blue[850],
                }}
                activeOpacity={0.7}
                onPress={() => toggle(cities[index].nome)}
              >
                {selected.findIndex((i) => i === cities[index].nome) !== -1 && (
                  <MaterialIcons
                    name='check'
                    size={RFValue(22)}
                    color={colors.blue[800]}
                  />
                )}

                <Heading
                  fontSize={RFValue(18)}
                  fontFamily='body'
                  fontWeight='semibold'
                  w='90%'
                  ml='2%'
                >
                  {cities[index].nome}
                </Heading>
              </TouchableOpacity>
            </HStack>
          )}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
      <VStack h='1/6'>
        <Button
          mt={RFValue(4)}
          w={'80%'}
          alignSelf={'center'}
          onPress={() => handleCities(selected)}
        >
          Confirmar
        </Button>
      </VStack>
    </VStack>
  )
}
