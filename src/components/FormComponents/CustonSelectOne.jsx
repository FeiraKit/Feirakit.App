import React from 'react'
import { Select, useTheme } from 'native-base'

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
      placeholder={title}
      fontSize='md'
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
