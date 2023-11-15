import React from 'react'
import { Text, useTheme } from 'native-base'
import { Controller } from 'react-hook-form'
import { SelectStates } from './selectStates'

export function ControlledSelect({
  control,
  name,
  error,
  infoText,
  iconName,
  placeholder,
  isPassword,
  keyboardType,
  ...rest
}) {
  const { colors } = useTheme()
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <SelectStates
            onValueChange={onChange}
            changeColor={!!error}
            selectedValue={value}
          />
        )}
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
