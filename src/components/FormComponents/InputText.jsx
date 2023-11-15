import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Input, Icon, useTheme } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

export function InputText({
  placeholder,
  errors,
  changeColor,
  keyboardType = 'default',
  iconName,
  isPasswordInput,
  ...rest
}) {
  const { colors } = useTheme()
  const [inputType, setInputType] = useState(
    isPasswordInput ? 'password' : 'text'
  )

  const handleVisibilityPassword = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }
  return (
    <Input
      w='94%'
      mt={4}
      height={54}
      alignSelf='center'
      bgColor={colors.gray[100]}
      borderRadius={8}
      placeholder={placeholder}
      color={changeColor ? colors.purple[500] : colors.blue[900]}
      placeholderTextColor={changeColor ? colors.purple[500] : colors.blue[800]}
      fontSize={RFValue(16)}
      fontFamily={'body'}
      leftElement={
        !!iconName && (
          <Icon
            color={changeColor ? colors.purple[500] : colors.blue[900]}
            as={<MaterialIcons name={iconName} />}
            size={6}
            ml={2}
          />
        )
      }
      rightElement={
        isPasswordInput && (
          <TouchableOpacity onPress={handleVisibilityPassword}>
            <Icon
              color={changeColor ? colors.purple[500] : colors.blue[900]}
              as={
                <MaterialIcons
                  name={inputType == 'text' ? 'visibility-off' : 'visibility'}
                />
              }
              size={6}
              marginRight={2}
            />
          </TouchableOpacity>
        )
      }
      keyboardType={keyboardType}
      type={inputType}
      _disabled={{
        opacity: 1,
      }}
      {...rest}
    />
  )
}
