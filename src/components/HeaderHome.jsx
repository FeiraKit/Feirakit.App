import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme, Heading } from 'native-base'
import { RFValue } from 'react-native-responsive-fontsize'

export function HeaderHome({ headerText, CBclear }) {
  const { colors } = useTheme()

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginTop: -7,
        alignItems: 'center',
        paddingVertical: 6,
        marginVertical: 6,
      }}
    >
      <TouchableOpacity
        style={{
          marginRight: 5,
          marginBottom: -1,
        }}
        onPress={() => CBclear(true)}
      >
        <MaterialIcons
          name='clear'
          size={RFValue(22)}
        />
      </TouchableOpacity>
      <Heading
        fontSize={22}
        color={colors.gray[600]}
      >
        {headerText}
      </Heading>
    </View>
  )
}
