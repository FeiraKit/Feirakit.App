import React from 'react'
import { VStack, Heading, useTheme} from 'native-base'

export function OnboardTitle({ title }) {
  const {colors} = useTheme()
  return (
    <Heading
      fontSize={25}
      mt={4}
      ml={4}
      color={colors.black[500]}
    >
     {
      title
     }
    </Heading>
  )
}
