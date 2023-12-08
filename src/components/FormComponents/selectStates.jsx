import React from 'react'
import { Select, useTheme } from 'native-base'
import { BRAZILIANS_STATES } from '../../constants/States'

export function SelectStates({ changeColor, ...rest }) {
  const { colors } = useTheme()
  return (
    <Select
      h={54}
      alignSelf='center'
      w='94%'
      mt={4}
      borderRadius={8}
      placeholderTextColor={changeColor ? colors.purple[500] : colors.blue[800]}
      borderColor={changeColor ? colors.purple[500] : colors.blue[900]}
      color={colors.blue[900]}
      placeholder='Selecione o estado'
      fontSize='md'
      accessibilityLabel='Escolha o seu estado de origem'
      {...rest}
    >
      {BRAZILIANS_STATES.map((state) => (
        <Select.Item
          key={state.value}
          accessibilityLabel={state.label}
          label={state.label}
          value={state.value}
        />
      ))}
    </Select>
  )
}
