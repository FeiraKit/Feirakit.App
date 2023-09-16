import React from "react";
import { VStack, Center, Text } from "native-base";
import { ButtonBack } from "../components/ButtonBack";

export function Settings() {
  return (
    <VStack flex={1} w="full">
      <ButtonBack />
      <Center mt="1/2">
        <Text>Configurações</Text>
      </Center>
    </VStack>
  );
}
