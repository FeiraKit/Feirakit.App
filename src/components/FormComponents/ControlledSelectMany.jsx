import React from 'react'
import { Text, useTheme } from 'native-base'
import { Controller } from 'react-hook-form'
import { SelectStates } from './selectStates'
import { SelectOne } from './CustonSelectOne'

export function ControlledSelectMany({
  selectItemsValue,
  control,
  name,
  error,
  infoText,
  iconName,
  ...rest
}) {
  const { colors } = useTheme()
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) =>
  }
      />
      {!!error && (
        <Text
          alignSelf='flex-start'
          marginLeft={8}
          color={colors.purple[500]}
        >
          {error.message}
        </Text>
      )}
    </>
  )
}
