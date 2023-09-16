import React from "react";
import { useTheme, Image, View } from "native-base";
export function LogoFeira() {
  const { colors } = useTheme();

  return (
    <View>
        <Image alt='texto feira-kit' 
        source={require("../assets/logo.png")}
        style={{ width: 230, height: 70 }}
        resizeMode="contain"
        alignSelf="center"
        alignContent="center"
        alignItems="center"
        mt={-77}
      />
    </View>
  );
}
