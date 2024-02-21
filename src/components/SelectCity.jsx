import React from 'react';
import { View } from 'react-native';
import { Select, useTheme } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function SelectCity({ cities, onSelectZone, selectedZone, CBclear }) {
  const { colors } = useTheme();

  const handleSelectValue = (zone) => {
    onSelectZone(zone);
  };

  const closeSelect = () => {
    onSelectZone(null);
    CBclear();
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={closeSelect}>
        <MaterialIcons
          name={selectedZone === null ? 'location-pin' : 'clear'}
          size={22}
          color={colors.gray[500]}
        />
      </TouchableOpacity>

      <Select
        alignSelf="flex-start"
        w="full"
        flex={1}
        defaultValue={null}
        selectedValue={selectedZone === null ? '-1' : selectedZone}
        color={colors.gray[600]}
        fontSize={RFValue(16)}
        fontWeight="bold"
        accessibilityLabel="select para Buscar produtos por região"
        placeholder="Buscar produtos por região"
        placeholderTextColor={colors.gray[500]}
        variant="unstyled"
        dropdownIcon={<MaterialIcons name="arrow-drop-down" size={22} color={colors.gray[500]} />}
        onValueChange={(zone) => handleSelectValue(zone)}
      >
        {cities.map((city) => (
          <Select.Item key={city.nome} label={city.nome} value={city.nome} />
        ))}
      </Select>
    </View>
  );
}
