import React from 'react'
import { Text, useTheme } from 'native-base'
import { Controller } from 'react-hook-form'
import { InputText } from './InputText'

export function ControlledInput({
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
        )}
      />
      {infoText && (
        <Text
          fontSize='sm'
          ml='4%'
        >
          Informe um E-mail ativo
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
