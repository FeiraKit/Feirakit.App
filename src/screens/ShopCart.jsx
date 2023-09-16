import React from "react";
import { VStack, Text, Center } from "native-base";
import { ButtonBack } from "../components/ButtonBack";

export function ShopCart() {
  return (
    <VStack flex={1} w="full">
      <ButtonBack />
      <Center mt="1/2">
        <Text>Carrinho de compras</Text>
      </Center>
    </VStack>
  );
}
