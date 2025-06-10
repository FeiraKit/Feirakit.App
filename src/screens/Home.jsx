import { VStack, HStack, Input, Icon, useTheme, FlatList, Center, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Image, TouchableOpacity, View, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FooterListLoader, LoadingProducts } from '../components/Loading';
import { Product } from '../services/product';
import { ProductCard } from '../components/ProductCard';
import { SelectCity } from '../components/SelectCity';
import { HeaderHome } from '../components/HeaderHome';

export function Home() {
  // screen variables

  const product = new Product();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [keepFetching, setKeepFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Pagination variables
  const [products, setProducts] = useState([]);
  const limit = 10;
  const sort = -1;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [zone, setZone] = useState(null);
  const [cities, setCities] = useState([]);
  const [findingByName, setFindingByName] = useState(false);

  const [iconName, setIconName] = useState('storefront');
  const [emptyText, setEmptyText] = useState('Não há Produtos para mostrar.');
  const [headerText, setHeaderText] = useState('Produtos em');

  const [showFilter, setShowFilter] = useState(true);

  function handleOpenDescription(productId, productEntity, isInfo) {
    navigation.navigate('description', { productId, productEntity, isInfo });
  }
  const getNewProducts = () => {
    if (keepFetching) {
      setFetchingProducts(true);
      setTimeout(() => {
        getProducts();
      }, 100);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setProducts([]);
    setPage(1);
    setZone(null);
    setRefreshing(true);
    setFindingByName(false);
    setShowFilter(true);
    setSearch('');
    getProducts(true);
  };

  const getProducts = (refresh) => {
    if (page === 1) {
      setIsLoading(true);
    }
    setFindingByName(false);
    getCities();
    setShowFilter(true);
    setSearch('');

    product
      .getAllProducts(refresh ? 1 : page, limit, sort)
      .then(({ data }) => {
        if (!data) {
          return;
        }
        if (refresh) {
          setProducts(data);
          setPage(2);
        } else {
          setProducts([...products, ...data]);
          setPage(page + 1);
        }
        setFetchingProducts(false);
        setRefreshing(false);
        setIsLoading(false);
        if (data.length === 0 || data.length < limit) {
          setKeepFetching(false);
        } else {
          setKeepFetching(true);
        }
      })
      .catch(() => {
        setProducts([]);
        setPage(1);
        setIsLoading(false);
        setRefreshing(false);
        setKeepFetching(false);
        setIconName('sync-problem');
        setEmptyText('Ocorreu um erro, tente novamente');
      });
  };

  const getCities = async () => {
    product
      .getCities()
      .then(async ({ data }) => {
        setCities(data.resultado);
        await AsyncStorage.setItem('allCities', JSON.stringify(data.resultado));
      })
      .catch(() => {
        setCities([]);
      });
  };

  const getProductsByName = (name) => {
    setIsLoading(true);
    setFindingByName(true);
    setShowFilter(false);

    setHeaderText(`resultado para: "${name}"`);
    product
      .getProductsByName(name)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  const getProductsByZone = (selectedzone) => {
    setIsLoading(true);
    product
      .getProductsByCity(selectedzone)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  const loadFeed = () => {
    if (zone === null) {
      getProducts();
    }
  };

  useEffect(loadFeed, []);

  useEffect(() => {
    if (zone === null) {
      return;
    }
    getProductsByZone(zone);
  }, [zone]);

  return (
    <VStack flex={1} w="full" bg={colors.gray[200]} p={8} pt={0} alignItems="center" px={4} pb={0}>
      <VStack w="full" alignItems="center">
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 230, height: 70 }}
          resizeMode="contain"
        />
        <HStack mt={-1} alignItems="center">
          <Input
            bgColor={colors.gray[300]}
            h={10}
            color={colors.blue[900]}
            flex={1}
            leftElement={
              <Icon color={colors.blue[700]} as={<MaterialIcons name="search" />} size={6} ml={2} />
            }
            placeholder="Pesquisar"
            placeholderTextColor={colors.blue[700]}
            fontSize={14}
            borderRadius={8}
            mr={4}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => {
              getProductsByName(search);
            }}
            onBlur={() => {
              getProductsByName(search);
            }}
            style={{ fontFamily: 'Montserrat_500Medium', fontWeight: '500' }}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <View>
              <MaterialIcons name="menu" size={45} color={colors.blue[600]} />
            </View>
          </TouchableOpacity>
        </HStack>
        <HStack
          w="full"
          alignItems="center"
          justifyContent="flex-start"
          style={{
            justifyContent: 'center',
            paddingVertical: 4,
            marginVertical: 4,
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          {findingByName && <HeaderHome headerText={headerText} CBclear={handleRefresh} />}

          {showFilter && (
            <SelectCity
              cities={cities}
              selectedZone={zone}
              onSelectZone={setZone}
              CBclear={handleRefresh}
            />
          )}
        </HStack>
      </VStack>

      {isLoading ? (
        <LoadingProducts />
      ) : (
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
          numColumns="2"
          w="100%"
          keyExtractor={(productData) => productData.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => handleOpenDescription(item.id, item, false)}
            />
          )}
          ListEmptyComponent={() => (
            <Center flex={1} h={400}>
              <TouchableOpacity onPress={handleRefresh}>
                <MaterialIcons name={iconName} size={80} color={colors.gray[300]} mt />
              </TouchableOpacity>
              {'\n'}
              <Text color={colors.gray[300]} fontSize="4xl" textAlign="center">
                {emptyText}
              </Text>
            </Center>
          )}
          onEndReached={getNewProducts}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<FooterListLoader fetchingProducts={fetchingProducts} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.blue[600]]}
            />
          }
        />
      )}
    </VStack>
  );
}
