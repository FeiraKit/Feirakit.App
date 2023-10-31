import React from 'react'
import { Text, useTheme } from 'native-base'
import { Controller } from 'react-hook-form'
import { InputText } from './InputText'
import { MaskedInput } from './MaskedInput'

export function ControlledInput({
  isMasked = false,
  action,
  control,
  name,
  error,
  infoText,
  options,
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
        render={({ field: { onChange, value } }) =>
          isMasked ? (
            <MaskedInput
              onValueChange={onChange}
              changeColor={!!error}
              onChangeText={onChange}
              iconName={iconName}
              value={value}
              options={options}
              action={action}
              placeholder={placeholder}
              keyboardType={keyboardType}
              {...rest}
            />
          ) : (
            <InputText
              keyboardType={keyboardType}
              iconName={iconName}
              placeholder={placeholder}
              changeColor={!!error}
              value={value}
              isPasswordInput={isPassword}
              onChangeText={onChange}
              {...rest}
            />
          )
        }
      />
      {infoText && (
        <Text
          fontSize='sm'
          ml='4%'
        >
          {infoText}
        </Text>
      )}
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
