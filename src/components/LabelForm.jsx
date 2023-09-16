import { Heading, useTheme } from 'native-base'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

export function LabelForm({ text }) {
  const { colors } = useTheme()
  return (
    <Heading
      mt={'2'}
      fontSize={RFValue(18)}
      color={colors.blue[700]}
      fontFamily='body'
      fontWeight='semibold'
    >
      {text}
    </Heading>
  )
}
