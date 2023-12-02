import { Text } from 'native-base'
import React from 'react'

export function InputLabel({ title }) {
  return (
    <Text
      alignSelf='flex-start'
      ml={4}
      mt={4}
      fontSize='xl'
    >
      {title}
    </Text>
  )
}
