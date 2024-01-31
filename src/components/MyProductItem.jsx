import React from 'react'
import {
  Center,
  Heading,
  HStack,
  Image,
  Pressable,
  useTheme,
  VStack,
} from 'native-base'
import { RFValue } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'

export function MyProductItem({ product, onPress }) {
  const { colors } = useTheme()

  return (
    <Pressable
      bgColor={colors.gray[250]}
      onPress={onPress}
      mr='4%'
      mb={4}
      w='98%'
      maxH={320}
      p={4}
      borderRadius={8}
      borderWidth={1}
      borderColor={colors.blue[500]}
      justifyContent='space-between'
    >
      <HStack justifyContent='space-between'>
        <Image
          source={{ uri: product.imagem_url[0] }}
          style={{
            width: '20%',
            height: 65,
            alignSelf: 'center',
            marginBottom: 4,
          }}
          resizeMode='center'
          alt={product.descricao}
        />

        <VStack
          alignSelf='center'
          w='70%'
          ml={2}
        >
          <Heading
            fontSize={product.nome.length > 14 ? RFValue(12) : RFValue(16)}
            mb={1}
          >
            {product.nome}
          </Heading>

          <HStack>
            <Heading
              fontWeight='medium'
              fontFamily='heading'
              fontSize={RFValue(12)}
              mb={1}
              color={colors.green[300]}
            >
              R$ {product.preco.toFixed(2).replace('.', ',')}
            </Heading>

            <Heading
              fontWeight='medium'
              fontFamily='heading'
              fontSize={RFValue(12)}
              mb={1}
              color={colors.gray[400]}
              ml={2}
            >
              Qtd.Estoque: {product.estoque}
            </Heading>
          </HStack>
        </VStack>
        <Center>
          <MaterialIcons
            color={colors.gray[300]}
            name='chevron-right'
            size={RFValue(46)}
          />
        </Center>
      </HStack>
    </Pressable>
  )
}
