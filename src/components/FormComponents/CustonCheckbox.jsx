import React from 'react'
import { Checkbox, HStack, Heading, useTheme } from 'native-base'
import { RFValue } from 'react-native-responsive-fontsize'

export function CustonCheckbox({ onChange, label, value, ...rest }) {
  const { colors } = useTheme()
  return (
    <HStack
      width='94%'
      alignSelf={'center'}
      {...rest}
    >
      <Checkbox
        mt={4}
        _text={{ color: colors.blue[700] }}
        accessibilityLabel={
          'caixa de seleção para informar se o produto será colhido após a compra'
        }
        style={{ width: RFValue(26), height: RFValue(26), borderRadius: 8 }}
        onChange={onChange}
        isChecked={value}
      >
        <Heading
          fontSize={RFValue(18)}
          color={colors.blue[700]}
          fontFamily='body'
          fontWeight='semibold'
          w='90%'
          ml='1%'
        >
          {label}
        </Heading>
      </Checkbox>
    </HStack>
  )
}
