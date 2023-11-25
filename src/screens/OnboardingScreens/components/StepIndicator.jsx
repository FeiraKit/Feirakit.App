import React from 'react'
import { HStack, View, useTheme } from 'native-base'

export function StepIndicator({ active }) {
  const { colors } = useTheme()
  return (
    <HStack
      width='100%'
      h={10}
      my='4'
      justifyContent={'center'}
      alignItems={'center'}
    >
      <View
        key={1}
        w={active == 1 ? 6 : 3}
        h={3}
        bgColor={active == 1 ? 'blue.900' : 'gray.300'}
        borderRadius='full'
        mx={1}
      />
      <View
        key={2}
        w={active == 2 ? 6 : 3}
        h={3}
        bgColor={active == 2 ? 'blue.900' : 'gray.300'}
        borderRadius='full'
        mx={1}
      />
      <View
        key={3}
        w={active == 3 ? 6 : 3}
        h={3}
        bgColor={active == 3 ? 'blue.900' : 'gray.300'}
        borderRadius='full'
        mx={1}
      />
      <View
        key={4}
        w={active == 4 ? 6 : 3}
        h={3}
        bgColor={active == 4 ? 'blue.900' : 'gray.300'}
        borderRadius='full'
        mx={1}
      />
    </HStack>
  )
}
