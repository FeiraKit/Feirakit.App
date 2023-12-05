import { Text } from 'native-base'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

export function InputLabel({ title, ...rest }) {
  return (
    <Text
      alignSelf='flex-start'
      ml={RFValue(4)}
      fontSize='xl'
      {...rest}
    >
      {title}
    </Text>
  )
}
