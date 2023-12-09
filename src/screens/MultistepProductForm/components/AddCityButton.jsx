import React from 'react'
import { HStack, Text, useTheme } from 'native-base'
import { RFValue } from 'react-native-responsive-fontsize'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export function AddCityButton({ action }) {
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      alignSelf={'center'}
      mb={RFValue(2)}
      onPress={action}
    >
      <HStack
        alignSelf={'center'}
        borderBottomWidth={1}
        borderColor={colors.blue[900]}
        w='94%'
        justifyContent={'center'}
        alignItems={'center'}
      >
        <MaterialIcons
          name='add'
          size={RFValue(22)}
        />

        <Text
          fontSize={RFValue(16)}
          ml={RFValue(4)}
        >
          Adicionar cidade
        </Text>
      </HStack>
    </TouchableOpacity>
  )
}
