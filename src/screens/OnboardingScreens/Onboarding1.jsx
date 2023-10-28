import React from "react";
import { VStack, Center, Image, Text, useTheme, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

export function Onboarding1() { 
  const navigation = useNavigation()
  const { colors } = useTheme();

return (    
    <VStack flex={1} w="full">
      <Center mt="1/2">
      <Image
        source={require('./assets/Foto1.png')}
        style={{ width: 269, height: 281 }}
        resizeMode='contain'
      />
          <Text fontSize={25} mt={4} ml={4} color={colors.black[500]}>
            Bem-Vindo ao Feira Kit!
            </Text>
            <Text fontSize={15} mt={4} ml={4} color={colors.gray[400]} mb={2}> 
           Descubra os melhores produtos da sua região, diretamente na palma da sua mão.
            </Text>
          <Button
        onPress={() => navigation.navigate("Onboarding2")}
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
