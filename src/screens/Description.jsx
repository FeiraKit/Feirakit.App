import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Text,
  Box,
  useTheme,
  VStack,
  HStack,
  Heading,
  FlatList,
  Image,
} from 'native-base'
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { showMessage } from 'react-native-flash-message'
import { MaterialIcons , FontAwesome5 } from '@expo/vector-icons'
import ImageButton from '../components/ImageButton'
import { WhatsappButton } from '../components/WhatsappButton'
import { ButtonBack } from '../components/ButtonBack'

import { LogoFeira } from '../components/LogoFeira'
import { Product } from '../services/product'
import { User } from '../services/user'
import { styles } from './styles/DescriptionStyles'
import { removeImageInFirebaseStorage } from '../utils/UploadImages'

export function Description() {
  const productInstance = new Product()
  const userInstance = new User()
  const navigation = useNavigation()
  const { colors } = useTheme()
  const route = useRoute()
  const { product } = route.params
  const { isInfo } = route.params
  const [amount, setAmount] = useState(1)
  const [urlImage, setUrlImage] = useState(product.imagem_url[0])
  const Images = product.imagem_url
  const [WhatsAppNumber, setWhatsAppNumber] = useState('')
  const [endereco, setEndereco] = useState()
  const [bairroProdutor, setBairroProdutor] = useState()
  const [produtor, setProdutor] = useState()
  const [isLoadingImage, setIsloadingImage] = useState(true)

  const btnLessDisabled = amount === 1
  const btnPlusDisabled = amount >= product.estoque

  // eslint-disable-next-line no-shadow
  function handleOpenEdit(product) {
    navigation.navigate('EditProduct', { produto: product })
  }
  const texts = {
    title: 'Exluir',
    description: `Realmente deseja excluir "${product.nome}"`,
    optionYes: 'Sim',
    optionNo: 'Não',
  }

  const deleteProduct = (id) => {
    Alert.alert(texts.title, texts.description, [
      {
        text: texts.optionNo,
        onPress: () => {
          
        },
      },
      {
        text: texts.optionYes,
        onPress: () => {
          const objDelete = { id }
          productInstance
            .deleteProduct(JSON.stringify(objDelete))
            .then(() => {
              // eslint-disable-next-line array-callback-return
              product.imagem_url.map((url) => {
                removeImageInFirebaseStorage(url)
              })

              showMessage({
                message: 'Produto excluído com sucesso',
                type: 'warning',
              })
              navigation.goBack()
            })
            .catch((error) => {
              showMessage({
                message: 'Erro ao apagar produto',
                type: 'danger',
              })
              console.log(`====>um erro ocorreu: ${  error}`)
            })
        },
      },
    ])
  }

  useEffect(() => {
    userInstance
      .getUserById(product.produtor_id)
      .then(({ data }) => {
        setEndereco(
          `${data.resultado[0].endereco.cidade 
            }-${ 
            data.resultado[0].endereco.estado}`
        )
        setProdutor(data.resultado[0].nome)
        setBairroProdutor(data.resultado[0].endereco.bairro)
        setWhatsAppNumber(data.resultado[0].telefone)
      })
      .catch((error) => {
        showMessage({
          message: 'Existe um erro com o produto',
          type: 'danger',
        })
        navigation.goBack()
        console.log(error)
      })
  }, [])
  return (
    <VStack style={styles.container}>
      <ButtonBack />
      <LogoFeira />
      <Box style={styles.imagebox}>
        {isLoadingImage && (
          <Image
            source={require('../assets/loading.gif')}
            style={[
              styles.image,
              {
                position: 'absolute',
                zIndex: 1000,
                resizeMode: 'cover',
              },
            ]}
            alt={product.descricao}
          />
        )}
        <Image
          source={{ uri: urlImage }}
          style={styles.image}
          onLoad={() => setIsloadingImage(false)}
          alt='imagem dos produtos'
        />
      </Box>
      <ScrollView height='100%'>
        <FlatList
          width="100%"
          showsHorizontalScrollIndicator={false}
          mt={-4}
          horizontal
          contentContainerStyle={{ paddingHorizontal: '2%' }}
          data={Images}
          keyExtractor={(images) => images}
          renderItem={({ index }) => (
            <ImageButton
              urlImage={product.imagem_url[index]}
              active={urlImage === product.imagem_url[index]}
              onPress={() => {
                if (urlImage !== product.imagem_url[index]) {
                  setIsloadingImage(true)
                  setUrlImage(product.imagem_url[index])
                }
              }}
            />
          )}
        />

        {isInfo && (
          <HStack
            mt={-5}
            mb={3}
            alignItems='center'
            justifyContent='space-evenly'
            style={styles.actionsContainer}
          >
            <TouchableOpacity
              style={[
                styles.btnActions,
                {
                  borderColor: colors.purple[200],
                  backgroundColor: colors.gray[200],
                  shadowColor: colors.purple[400],
                  elevation: 14,
                },
              ]}
              onPress={() => handleOpenEdit(product)}
            >
              <MaterialIcons
                name='edit'
                size={RFValue(24)}
                color={colors.purple[600]}
              />
              <Heading
                color={colors.purple[600]}
                fontSize={RFValue(16)}
              >
                Editar
              </Heading>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnActions,
                {
                  borderColor: colors.red[400],
                  backgroundColor: colors.gray[200],
                  shadowColor: colors.red[800],
                  elevation: 14,
                },
              ]}
              onPress={() => deleteProduct(product.id)}
            >
              <MaterialIcons
                name='delete-outline'
                size={25}
                color={colors.red[600]}
              />
              <Heading
                color={colors.red[600]}
                fontSize={RFValue(16)}
              >
                Excluir
              </Heading>
            </TouchableOpacity>
          </HStack>
        )}

        <HStack
          marginTop={-10}
          mr={5}
          pr={5}
          justifyContent='space-between'
          alignSelf='center'
          px='2%'
          w='90%'
          minW='90%'
          alignContent='center'
          justifyItems='center'
          pt={2}
        >
          {product.bestbefore && (
            <FontAwesome5
              name='medal'
              size={30}
              style={{
                color: colors.green[600],
                alignSelf: 'center',
                marginTop: -10,
              }}
            />
          )}

          <HStack
            w={product.bestbefore ? '60%' : '65%'}
            justifyContent='space-between'
            ml={2}
          >
            <Heading
              style={styles.text}
              fontSize={product.nome.length > 12 ? RFValue(14) : RFValue(22)}
            >
              {product.nome}
            </Heading>
          </HStack>
          <HStack ml={2}>
            <Heading
              style={[styles.text, { paddingTop: 4 }]}
              fontSize={RFValue(20)}
            >
              R$ {product.preco.toFixed(2).replace('.', ',')}
            </Heading>
          </HStack>
        </HStack>
        <HStack
          mt={-2}
          w='90%'
          alignSelf='center'
          mb={2}
        >
          <MaterialIcons
            name='location-pin'
            size={28}
            style={{ color: colors.gray[600], alignSelf: 'center' }}
          />
          <VStack>
            <Text fontSize={RFValue(12)}>{endereco}</Text>
            <Text fontSize={RFValue(12)}>{bairroProdutor}</Text>
          </VStack>
        </HStack>
        <View style={styles.descriptionBox}>
          <Heading size='sm'>
            {`${product.validade.split('-').reverse().join('/')} \n`}
          </Heading>
          <Heading
            size='sm'
            mt={-5}
            mb={1}
          >
            Categoria: {product.categoria}
          </Heading>

          {product.bestbefore && (
            <Text
              style={{
                fontSize: 14,
                textAlign: 'left',
                color: colors.green[600],
              }}
            >
              Colhido após a compra
            </Text>
          )}

          <Text style={{ fontSize: 14, textAlign: 'left' }}>
            {product.descricao}
          </Text>
        </View>

        {produtor !== undefined && (
          <HStack
            mt={2}
            w='90%'
            alignSelf='center'
            justifyItems='center'
            alignContent='center'
            mb={2}
          >
            <Text
              display='flex'
              alignItems='center'
              fontSize={RFValue(14)}
            >
              Vendido por
            </Text>
            <Text
              color={colors.blue[600]}
              fontSize={RFValue(14)}
            >{` ${produtor.substring(0, 19)}`}</Text>
          </HStack>
        )}

        {!isInfo && (
          <>
            <Text
              style={[
                styles.text,
                { fontSize: 20, marginLeft: '7%', marginTop: 20 },
              ]}
            >
              Quantidade
            </Text>
            <HStack
              marginTop={2}
              alignSelf='center'
              h='16'
              w='1/3'
              justifyContent='space-between'
              alignItems='center'
              borderWidth={1}
              borderColor={colors.blue[700]}
            >
              <TouchableOpacity
                disabled={btnLessDisabled}
                onPress={() => setAmount(amount - 1)}
                style={styles.qtdButton}
              >
                <MaterialIcons
                  size={30}
                  name='remove'
                />
              </TouchableOpacity>
              <View>
                <Text style={{ fontSize: 20 }}>{amount}</Text>
              </View>
              <TouchableOpacity
                disabled={btnPlusDisabled}
                onPress={() => setAmount(amount + 1)}
                style={styles.qtdButton}
              >
                <MaterialIcons
                  size={30}
                  name='add'
                />
              </TouchableOpacity>
            </HStack>
            <Heading
              alignSelf="center"
              color={colors.blue[700]}
              fontSize={RFValue(16)}
            >
              {amount === 1 ? product.unidade : `${product.unidade  }s`}
            </Heading>
            {WhatsAppNumber !== '' && (
              <WhatsappButton
                WhatsAppNumber={WhatsAppNumber}
                Quantity={amount}
                unity={product.unidade}
                ProductName={`${product.nome}`}
                Name={`${produtor}`}
                ProductPrice={product.preco}
              />
            )}
          </>
        )}
      </ScrollView>
    </VStack>
  )
}
