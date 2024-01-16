import {
  VStack,
  HStack,
  Input,
  Icon,
  useTheme,
  FlatList,
  Center,
  Text,
} from 'native-base'
import { ProductCard } from '../components/ProductCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { useState, useCallback } from 'react'
import { FooterListLoader, LoadingProducts } from '../components/Loading'
import { Image, TouchableOpacity, View, RefreshControl } from 'react-native'
import { Product } from '../services/product'

import { useEffect } from 'react'
import { SelectCity } from '../components/SelectCity'
import { HeaderHome } from '../components/HeaderHome'

export function Home() {
  const product = new Product()
  const limit = 10
  const sort = -1
  const { colors } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [fetchingProducts, setFetchingProducts] = useState(false)
  const [iconName, setIconName] = useState('storefront')
  const [emptyText, setEmptyText] = useState('Não há Produtos para mostrar.')
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [region, setRegion] = useState('-1')
  const [headerText, setHeaderText] = useState('Produtos em')
  const [cities, setCities] = useState([])
  const [showFilter, setShowFilter] = useState(true)
  const [keepFetching, setKeepFetching] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [findingByName, setFindingByName] = useState(false)
  const navigation = useNavigation()

  function handleOpenDescription(productId, product, isInfo) {
    navigation.navigate('description', { productId, product, isInfo })
  }
  const getNewProducts = () => {
    if (keepFetching) {
      setTimeout(() => {
        setFetchingProducts(true)
        getAllProducts(false, true)
      }, 100)
    }
  }

  const getAllProducts = (refresh, gettingNew) => {
    setIsLoading(gettingNew ? false : true)
    setFindingByName(false)
    // getCities()
    setShowFilter(true)
    setSearch('')
    product
      .getAllProducts(refresh ? 1 : page, limit, sort)
      .then(({ data }) => {
        if (refresh) {
          setProducts(data)
          setPage(2)
          setKeepFetching(true)
        } else {
          setProducts([...products, ...data])
          setPage(page + 1)
          setFetchingProducts(false)
        }
        setRefreshing(false)
        setIsLoading(false)
        if (data.length == 0) {
          setKeepFetching(false)
        }
        if (data.length <= limit) {
        }
      })
      .catch((error) => {
        setProducts([])
        setIsLoading(false)
        setRefreshing(false)
        setIconName('sync-problem')
        setEmptyText(":'(\n Ocorreu um erro,tente novamente")
      })
  }

  // const getCities = async () => {
  //   product.getCities().then(async ({ data }) => {
  //     await setCities(data.resultado)
  //   })
  // }
  const HandleRegion = (region) => {
    setRegion(region)
  }

  const getProductsByName = (name) => {
    setIsLoading(true)
    setFindingByName(true)
    setShowFilter(false)
    setHeaderText(`resultado para: "${name}"`)
    product
      .getProductsByName(name)
      .then(({ data }) => {
        setProducts(data)
      })
      .catch((error) => {
        console.log(error)
      })
    setIsLoading(false)
  }
  const loadFeed = () => {
    getAllProducts(true)
  }

  useFocusEffect(useCallback(loadFeed, []))

  const onRefresh = () => {
    setPage(1)
    setIsLoading(true)
    setRegion('-1')
    setRefreshing(true)
    setProducts([])
    getAllProducts(true)
  }

  useEffect(() => {
    // chamada para a api passando o filtro de região que vai ser criado no backend
  }, [region])

  return (
    <VStack
      flex={1}
      w='full'
      bg={colors.gray[200]}
      p={8}
      pt={0}
      alignItems='center'
      px={4}
      pb={0}
    >
      <VStack
        w='full'
        alignItems='center'
      >
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 230, height: 70 }}
          resizeMode='contain'
        />
        <HStack
          mt={-1}
          alignItems='center'
        >
          <Input
            bgColor={colors.gray[300]}
            h={10}
            color={colors.blue[900]}
            flex={1}
            leftElement={
              <Icon
                color={colors.blue[700]}
                as={<MaterialIcons name='search' />}
                size={6}
                ml={2}
              />
            }
            placeholder='Pesquisar'
            placeholderTextColor={colors.blue[700]}
            fontSize={14}
            borderRadius={8}
            mr={4}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => {
              getProductsByName(search)
            }}
            onBlur={() => {
              getProductsByName(search)
            }}
            style={{ fontFamily: 'Montserrat_500Medium', fontWeight: '500' }}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer()
            }}
          >
            <View>
              <MaterialIcons
                name='menu'
                size={45}
                color={colors.blue[600]}
              />
            </View>
          </TouchableOpacity>
        </HStack>
        <HStack
          w='full'
          alignItems='center'
          justifyContent={'flex-start'}
        >
          {findingByName && (
            <HeaderHome
              headerText={headerText}
              CBclear={getAllProducts}
            />
          )}

          {showFilter && (
            <SelectCity
              cities={cities}
              CBsetRegion={HandleRegion}
            />
          )}
        </HStack>
      </VStack>

      {isLoading ? (
        <LoadingProducts />
      ) : (
        <>
          <FlatList
            data={products}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 70 }}
            numColumns='2'
            w='100%'
            keyExtractor={(product) => product.id}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => handleOpenDescription(item.id, item, false)}
              />
            )}
            ListEmptyComponent={() => (
              <Center
                flex={1}
                h={400}
              >
                <TouchableOpacity onPress={() => getAllProducts(true)}>
                  <MaterialIcons
                    name={iconName}
                    size={80}
                    color={colors.gray[300]}
                    mt
                  />
                </TouchableOpacity>
                {'\n'}
                <Text
                  color={colors.gray[300]}
                  fontSize='4xl'
                  textAlign='center'
                >
                  {emptyText}
                </Text>
              </Center>
            )}
            onEndReached={getNewProducts}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              <FooterListLoader fetchingProducts={fetchingProducts} />
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.blue[600]]}
              />
            }
          />
        </>
      )}
    </VStack>
  )
}
