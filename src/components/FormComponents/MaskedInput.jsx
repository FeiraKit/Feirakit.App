import React from 'react'
import { Icon, useTheme, HStack } from 'native-base'
import { FontAwesome5 } from '@expo/vector-icons'
import { TextInputMask } from 'react-native-masked-text'
import { RFValue } from 'react-native-responsive-fontsize'

export function MaskedInput({ changeColor, iconName, action, value, ...rest }) {
  const { colors } = useTheme()
  return (
    <>
      <HStack
        alignItems='center'
        height={54}
        alignSelf='center'
        w='94%'
        borderWidth={1}
        borderRadius={8}
        borderColor={changeColor ? colors.purple[500] : colors.blue[900]}
        bgColor={colors.gray[100]}
        mt={RFValue(3)}
        {...rest}
      >
        {!!iconName && (
          <Icon
            color={changeColor ? colors.purple[500] : colors.blue[900]}
            as={<FontAwesome5 name={iconName} />}
            size={5}
            ml={3}
          />
        )}

        <TextInputMask
          color={changeColor ? colors.purple[500] : colors.blue[900]}
          style={{
            fontFamily: 'Montserrat_400Regular',
            fontSize: RFValue(16),
            marginLeft: 11,
          }}
          width={!!iconName ? '70%' : '100%'}
          placeholderTextColor={
            changeColor ? colors.purple[500] : colors.blue[800]
          }
          value={value}
          {...rest}
          onEndEditing={
            !!action
              ? () => {
                  action(value)
                }
              : null
          }
        />
      </HStack>
    </>
  )
}
