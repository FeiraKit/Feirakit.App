import React, { useState, useCallback } from 'react'
import {
  VStack,
  HStack,
  useTheme,
  Heading,
  FlatList,
  Center,
  View,
} from 'native-base'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { ButtonBack } from '../components/ButtonBack'
import { LogoFeira } from '../components/LogoFeira'
import { MaterialIcons } from '@expo/vector-icons'
import { MyProductItem } from '../components/MyProductItem'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Product } from '../services/product'

export function MyProducts() {
  const productInstance = new Product()
  const { colors } = useTheme()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()
  const user = useSelector((state) => state.AuthReducers.userData.userData)
  function handleOpenAdd() {
    navigation.navigate('ProductForm', {})
  }

  function handleOpenDescription(productId, product, isInfo) {
    navigation.navigate('description', { productId, product, isInfo })
  }

  const getProductsByIdUsuario = () => {
    setIsLoading(true)
    productInstance
      .getProductsByIdUsuario(user.id)
      .then(({ data }) => {
        setProducts(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  useFocusEffect(useCallback(getProductsByIdUsuario, []))

  return (
    <VStack
      flex={1}
      w='full'
      px='3%'
    >
      <ButtonBack />
      <LogoFeira />
      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginTop: -60, marginRight: 10 }}
        onPress={() => handleOpenAdd()}
      >
        <View>
          <MaterialIcons
            name='add'
            size={50}
            color={colors.blue[600]}
          />
        </View>
      </TouchableOpacity>
      <Heading
        size='md'
        mt={4}
        color={colors.gray[500]}
        justifyItems='left'
        w='full'
        ml='2%'
        mb={4}
      >
        Meus produtos
      </Heading>
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <FlatList
          paddingX='2%'
          data={products}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          w='100%'
          keyExtractor={(product) => product.id}
          renderItem={({ item }) => (
            <MyProductItem
              product={item}
              onPress={() => handleOpenDescription(item.id, item, true)}
            />
          )}
          ListEmptyComponent={() => (
            <View
              bgColor={colors.gray[250]}
              mr='4%'
              mb={4}
              w='98%'
              h={'90%'}
              p={4}
              borderRadius={8}
              borderWidth={1}
              borderColor={colors.gray[500]}
              justifyContent='space-between'
            >
              <HStack justifyContent='space-between'>
                <Center>
                  <MaterialIcons
                    color={colors.gray[300]}
                    name='remove-shopping-cart'
                    size={50}
                  />
                </Center>
                <VStack
                  alignSelf='center'
                  w='70%'
                  ml={2}
                >
                  <Heading
                    fontWeight='medium'
                    fontFamily='heading'
                    size='sm'
                    mb={1}
                    color={colors.gray[500]}
                  >
                    Você ainda não tem produtos cadatrados
                  </Heading>
                </VStack>

                <Center>
                  <TouchableOpacity onPress={() => getProductsByIdUsuario()}>
                    <MaterialIcons
                      color={colors.gray[300]}
                      name='refresh'
                      size={50}
                    />
                  </TouchableOpacity>
                </Center>
              </HStack>
            </View>
          )}
        />
      )}
    </VStack>
  )
}
