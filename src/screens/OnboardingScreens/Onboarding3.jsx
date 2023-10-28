import React from "react";
import { VStack, Center, Image, Button, Text, useTheme } from "native-base";
import { useNavigation } from "@react-navigation/native";

export function Onboarding3() {
  const navigation  =useNavigation()
  const { colors } = useTheme();
  return (
    <VStack flex={1} w="full">
      <Center mt="1/2">
      <Image
        source={require('./assets/Foto3.png')}
        style={{ width: 328, height: 240 }}
        resizeMode='contain'
      />
        <Text fontSize={25} mt={4} ml={4} color={colors.black[500]}>
            </Text>
            Compre e venda seus produtos
            <Text fontSize={15} mt={4} ml={4} color={colors.gray[400]}mb={2}>
           No Feira Kit conectamos você aos seus potenciais clientes
            </Text>
        <Button
        onPress={() => navigation.navigate("Onboarding4")}
        height={50}
        mt={150}
        w='80%'
        borderRadius={50}
      >
        Continue
      </Button>
      </Center>
    </VStack>
  );
}
