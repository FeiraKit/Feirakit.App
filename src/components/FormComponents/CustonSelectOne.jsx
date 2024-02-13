import React from 'react'
import { Select, useTheme } from 'native-base'
import { RFValue } from 'react-native-responsive-fontsize'

export function SelectOne({ changeColor, ItemsValue, title, ...rest }) {
  const { colors } = useTheme()

  return (
    <Select
      h={54}
      alignSelf='center'
      w='94%'
      mt={4}
      borderRadius={8}
      placeholderTextColor={changeColor ? colors.purple[500] : colors.blue[800]}
      color={colors.blue[900]}
      bgColor={colors.gray[100]}
      borderColor={changeColor ? colors.purple[500] : colors.blue[900]}
      borderWidth={1}
      placeholder={title}
      fontSize={RFValue(16)}
      accessibilityLabel={title}
      {...rest}
    >
      {ItemsValue.map((item) => (
        <Select.Item
          key={item}
          accessibilityLabel={item}
          label={item}
          value={item}
        />
      ))}
    </Select>
  )
}
