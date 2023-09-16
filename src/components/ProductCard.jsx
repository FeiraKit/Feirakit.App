import React,{ useState }from "react";
import { Heading, Image, Pressable, useTheme } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import { Text } from "react-native";

export function ProductCard({ product, onPress }) {
  const { colors } = useTheme();
  const [isLoadingImage,setIsloadingImage]=useState(true)
  const description = product.descricao.slice(0, 25) + "...";
  return (
    <Pressable
      onPress={onPress}
      mr="4%"
      mb={4}
      maxH={300}
      w="48%"
      bgColor="white"
      p={4}
      borderRadius={8}
      borderWidth={1}
      borderColor={colors.blue[500]}
      style={{shadowColor:colors.blue[500],elevation:5}}
    >  

    {isLoadingImage && 
       <Image
        source={require("../assets/loading.gif")}
        style={{
          width: "100%",
          height: 90,
          alignSelf: "center",
          marginBottom: 4,
          marginTop:16,
          position:'absolute',
          zIndex:1000
        }}
        resizeMode="cover"
        alt={product.descricao}
      />
  }
      
      <Image
        source={{uri:product.imagem_url[0]}}
        style={{
          width: "100%",
          height: 90,
          alignSelf: "center",
          marginBottom: 4,
        }}
        resizeMode="cover"
        onLoad={()=>setIsloadingImage(false)}
        alt={product.descricao}
      />

      <Heading fontWeight="medium" fontSize= {product.nome.length>8?RFValue(12):RFValue(16)} mb={1} mt={1} fontFamily="heading">
        {product.nome}
      </Heading>
      
      <Text
        style={{
          backgroundColor: colors.gray[200],
          color: colors.gray[400],
          fontSize: RFValue(10),
          height: 40,
          paddingHorizontal: 2,
          marginBottom:28
        }}
      >
        {description}
      </Text>
      <Heading fontWeight="medium" fontSize={RFValue(16)}  fontFamily="heading" position='absolute' bottom={4} left={4} >
        R$ {product.preco.toFixed(2)}
      </Heading>
      
    </Pressable>
  );
}
