import React from "react";
import { VStack, HStack, useTheme, View, Image,StatusBar } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function ButtonBack() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <VStack pb={-10} mt={1} mb={3} >
      <StatusBar/>
      <HStack alignItems='flex-start'>
        <TouchableOpacity onPress={handleGoBack}>
          <View
            pl={3}
            alignItems="center"
            justifyContent="center"
            borderColor={colors.blue[600]}
            borderRadius="full"
            borderWidth={4}
            m="9%"
            mr={0}
            w={45}
            h={45}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={25}
              color={colors.blue[600]}
            />
          </View>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}