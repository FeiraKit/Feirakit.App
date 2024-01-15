import React from 'react'
import { Text, useTheme } from 'native-base'
import { Controller } from 'react-hook-form'
import { SelectStates } from './selectStates'
import { SelectOne } from './CustonSelectOne'

export function ControlledSelect({
  isSelectState,
  selectItemsValue,
  control,
  name,
  error,
  infoText,
  iconName,
  placeholder,
  isPassword,
  keyboardType,
  selectLabel,
  secondaryAction,
  ...rest
}) {
  const { colors } = useTheme()
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) =>
          isSelectState ? (
            <SelectStates
              onValueChange={onChange}
              changeColor={!!error}
              selectedValue={value}
              {...rest}
            />
          ) : (
            <SelectOne
              changeColor={!!error}
              ItemsValue={selectItemsValue}
              title={selectLabel}
              selectedValue={value}
              onValueChange={onChange}
              {...rest}
            />
          )
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
