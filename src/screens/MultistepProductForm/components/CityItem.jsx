import React from 'react'
import { HStack, Text, useTheme } from 'native-base'
import { RFValue } from 'react-native-responsive-fontsize'

export function CityItem({ city }) {
  const { colors } = useTheme()
  return (
    <HStack
      alignSelf={'center'}
      mb={RFValue(2)}
    >
      <Text
        w='94%'
        borderBottomWidth={1}
        borderColor={colors.blue[900]}
        textAlign={'center'}
        fontSize={RFValue(16)}
      >
        {city}
      </Text>
    </HStack>
  )
}
