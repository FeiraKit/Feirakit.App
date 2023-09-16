import React, { useState } from 'react'
import { View } from 'react-native'
import { Select, useTheme } from 'native-base'
import { RFValue } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'

export function SelectCity({ cities, CBsetRegion }) {
  const { colors } = useTheme()

  const handleValueText = (text) => {
    CBsetRegion(text)
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginTop: -7,
        alignItems: 'center',
        marginVertical: 2,
      }}
    >
      <MaterialIcons
        name='location-pin'
        size={22}
        color={colors.gray[500]}
      />
      <Select
        alignSelf={'flex-start'}
        w={'full'}
        flex={1}
        defaultValue='-1'
        color={colors.gray[600]}
        fontSize={RFValue(16)}
        fontWeight={'bold'}
        accessibilityLabel='Região'
        placeholder='Região'
        variant='unstyled'
        dropdownIcon={
          <MaterialIcons
            name='arrow-drop-down'
            size={22}
            color={colors.gray[500]}
          />
        }
        onValueChange={(region) => handleValueText(region)}
      >
        <Select.Item
          label='selecione uma cidade'
          value='-1'
          key={-1}
        />

        {cities.map((city) => {
          return (
            <Select.Item
              key={city.id}
              label={city.nome}
              value={city.nome}
            />
          )
        })}
      </Select>
    </View>
  )
}
