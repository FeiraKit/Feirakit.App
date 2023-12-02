import { HStack, Progress, Text } from 'native-base'
import React from 'react'

export function ProgressBar({ percent }) {
  return (
    <HStack>
      <Progress
        value={percent}
        size='2xl'
        mb={4}
        mt='1.5'
        w={'full'}
      />
    </HStack>
  )
}
