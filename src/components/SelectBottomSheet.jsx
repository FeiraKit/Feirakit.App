import React, { useState } from 'react'
import { Button, VStack, HStack, Heading, useTheme } from 'native-base'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { RFValue } from 'react-native-responsive-fontsize'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export function SelectBottomSheet({ selectedCities, cities, handleCities }) {
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
    <VStack
      position={'relative'}
      h={'84%'}
      paddingX={RFValue(4)}
    >
      <BottomSheetFlatList
        ListHeaderComponent={
          <Heading
            fontFamily='body'
            fontSize={RFValue(18)}
            alignSelf='center'
          >
            O produto estará disponível em:
          </Heading>
        }
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
                marginVertical: 4,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              activeOpacity={0.7}
              underlayColor={colors.gray[400]}
              onPress={() => toggle(cities[index].nome)}
            >
              {selected.findIndex((i) => i === cities[index].nome) !== -1 && (
                <MaterialIcons
                  name='check'
                  size={RFValue(16)}
                />
              )}

              <Heading
                fontSize={RFValue(16)}
                color={colors.blue[700]}
                fontFamily='body'
                fontWeight='semibold'
                w='90%'
                ml='1%'
              >
                {cities[index].nome}
              </Heading>
            </TouchableOpacity>
          </HStack>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />

      <Button
        mt={RFValue(4)}
        w={'80%'}
        alignSelf={'center'}
        onPress={() => handleCities(selected)}
      >
        Confirmar
      </Button>
    </VStack>
  )
}
