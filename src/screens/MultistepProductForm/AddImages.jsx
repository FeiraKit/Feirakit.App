import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, FlatList, Text, VStack, HStack, useTheme } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { ProgressBar } from './components/ProgressBar'
import React, { useCallback, useRef } from 'react'
import { ButtonBack } from '../../components/ButtonBack'
import { LogoFeira } from '../../components/LogoFeira'
import { RFValue } from 'react-native-responsive-fontsize'
import { useEffect } from 'react'
import { useState } from 'react'
import BottomSheetBase from './components/BottomSheetBase'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { imagesSchema } from '../../validationsSchemes/productValidations'
import { Image } from 'react-native'
import { CustomImagePickerBottomSheet } from '../../components/FormComponents/CustonImagePickerBottomSheet'
import { LoadingImage } from '../../components/Loading'
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg'

export function AddImages() {
  const route = useRoute()
  const navigation = useNavigation()
  const { colors } = useTheme()
  const prevProduct = route.params.produto

  const [images, setImages] = useState([
    {
      cancelled: false, // Indica se a operação foi cancelada pelo usuário
      uri: 'https://cdn.pixabay.com/photo/2023/12/09/15/04/dog-8439530_640.jpg', // O URI (caminho) da imagem selecionada
      type: 'image/jpeg', // O tipo de mídia (imagem no caso)
      width: 1000, // A largura da imagem em pixels
      height: 800, // A altura da imagem em pixels
      exif: {}, // Informações EXIF da imagem (se disponíveis)
      base64: '...', // Dados da imagem codificados em base64 (opcional)
    },
    // {
    //   cancelled: false, // Indica se a operação foi cancelada pelo usuário
    //   uri: 'https://cdn.pixabay.com/photo/2023/04/24/07/27/grape-hyacinth-7947416_640.jpg', // O URI (caminho) da imagem selecionada
    //   type: 'image/jpeg', // O tipo de mídia (imagem no caso)
    //   width: 1000, // A largura da imagem em pixels
    //   height: 800, // A altura da imagem em pixels
    //   exif: {}, // Informações EXIF da imagem (se disponíveis)
    //   base64: '...', // Dados da imagem codificados em base64 (opcional)
    // },
    // {
    //   cancelled: false, // Indica se a operação foi cancelada pelo usuário
    //   uri: 'https://cdn.pixabay.com/photo/2023/05/24/05/06/dog-8014047_640.jpg', // O URI (caminho) da imagem selecionada
    //   type: 'image/jpeg', // O tipo de mídia (imagem no caso)
    //   width: 1000, // A largura da imagem em pixels
    //   height: 800, // A altura da imagem em pixels
    //   exif: {}, // Informações EXIF da imagem (se disponíveis)
    //   base64: '...', // Dados da imagem codificados em base64 (opcional)
    // },
    // {
    //   cancelled: false, // Indica se a operação foi cancelada pelo usuário
    //   uri: 'https://cdn.pixabay.com/photo/2022/12/02/05/13/dog-7630252_640.jpg', // O URI (caminho) da imagem selecionada
    //   type: 'image/jpeg', // O tipo de mídia (imagem no caso)
    //   width: 1000, // A largura da imagem em pixels
    //   height: 800, // A altura da imagem em pixels
    //   exif: {}, // Informações EXIF da imagem (se disponíveis)
    //   base64: '...', // Dados da imagem codificados em base64 (opcional)
    // },
    // {
    //   cancelled: false, // Indica se a operação foi cancelada pelo usuário
    //   uri: 'https://cdn.pixabay.com/photo/2023/03/17/11/27/dog-7858450_640.jpg', // O URI (caminho) da imagem selecionada
    //   type: 'image/jpeg', // O tipo de mídia (imagem no caso)
    //   width: 1000, // A largura da imagem em pixels
    //   height: 800, // A altura da imagem em pixels
    //   exif: {}, // Informações EXIF da imagem (se disponíveis)
    //   base64: '...', // Dados da imagem codificados em base64 (opcional)
    // },
    // {
    //   cancelled: false, // Indica se a operação foi cancelada pelo usuário
    //   uri: 'https://cdn.pixabay.com/photo/2022/10/11/12/38/french-bulldog-7514203_640.jpg', // O URI (caminho) da imagem selecionada
    //   type: 'image/jpeg', // O tipo de mídia (imagem no caso)
    //   width: 1000, // A largura da imagem em pixels
    //   height: 800, // A altura da imagem em pixels
    //   exif: {}, // Informações EXIF da imagem (se disponíveis)
    //   base64: '...', // Dados da imagem codificados em base64 (opcional)
    // },
    // {
    //   cancelled: false, // Indica se a operação foi cancelada pelo usuário
    //   uri: 'https://cdn.pixabay.com/photo/2021/11/22/05/02/dalmatian-6815838_640.jpg', // O URI (caminho) da imagem selecionada
    //   type: 'image/jpeg', // O tipo de mídia (imagem no caso)
    //   width: 1000, // A largura da imagem em pixels
    //   height: 800, // A altura da imagem em pixels
    //   exif: {}, // Informações EXIF da imagem (se disponíveis)
    //   base64: '...', // Dados da imagem codificados em base64 (opcional)
    // },
  ])
  const [diplayImageIndex, setDisplayImageIndex] = useState(0)

  const [isLoadingImage, setIsLoadingImages] = useState()

  const handleCheckInfo = () => {}

  const bottomSheetRef = useRef(BottomSheetBase)

  const openActionsSheet = useCallback(async () => {
    bottomSheetRef.current?.snapToIndex(0)
  }, [])

  const closeActionsSheet = () => {
    bottomSheetRef.current?.close()
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(imagesSchema),
  })

  return (
    <VStack
      w='full'
      h='full'
      px={'3%'}
    >
      <VStack h={'2/6'}>
        <ButtonBack />
        <LogoFeira />
        <ProgressBar percent='95' />
        <Text
          fontFamily={'body'}
          fontSize={RFValue(22)}
          textAlign={'left'}
        >
          Adicione imagens do seu produto
        </Text>
      </VStack>

      <VStack
        h={'3/6'}
        w='full'
        alignItems={'center'}
        position={'relative'}
      >
        <VStack
          borderWidth={1}
          borderColor={
            errors.imagem_url ? colors.purple[500] : colors.blue[700]
          }
          py={RFValue(9)}
          px={RFValue(18)}
          borderRadius={RFValue(4)}
          alignContent={'center'}
        >
          {images.length <= 0 ? (
            <TouchableOpacity onPress={openActionsSheet}>
              <VStack
                w={RFValue(130)}
                h={RFValue(100)}
                justifyContent={'center'}
              >
                <MaterialIcons
                  name='add-photo-alternate'
                  size={RFValue(80)}
                  style={{ alignSelf: 'center' }}
                  color={
                    errors.imagem_url ? colors.purple[500] : colors.blue[700]
                  }
                />
              </VStack>
            </TouchableOpacity>
          ) : (
            <Image
              source={{ uri: images[diplayImageIndex].uri }}
              style={{
                width: RFValue(130),
                height: RFValue(100),
                borderRadius: RFValue(2),
                alignSelf: 'center',
              }}
            />
          )}
        </VStack>

        <HStack
          mt={8}
          maxW={'full'}
        >
          <HStack
            alignItems='center'
            maxW={'98%'}
            borderRadius={RFValue(8)}
            mx={1}
          >
            {isLoadingImage ? (
              <LoadingImage />
            ) : (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={images}
                style={{
                  marginRight: RFValue(38),
                  paddingX: 4,
                  borderRadius: 4,
                }}
                keyExtractor={(item) => item.uri}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => setDisplayImageIndex(index)}>
                    <MaterialIcons
                      name='remove-circle'
                      color={colors.red[500]}
                      style={{
                        alignSelf: 'flex-start',
                        position: 'absolute',
                        zIndex: 10,
                      }}
                    />

                    <Image
                      source={{ uri: item.uri }}
                      style={{
                        marginRight: RFValue(4),
                        marginleft: RFValue(1),
                        width: RFValue(56),
                        height: RFValue(56),
                        borderRadius: 4,
                      }}
                      alt='Imagem do produto,selecionada da galeria'
                    />
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <Text
                    color={
                      errors.imagem_url ? colors.purple[500] : colors.gray[400]
                    }
                    fontSize={RFValue(12)}
                  >
                    {emptyImage
                      ? 'Adicione uma imagem'
                      : 'Nenhuma imagem selecionada'}
                  </Text>
                )}
              />
            )}
          </HStack>

          <HStack
            w='1/6'
            position={'absolute'}
            h={'full'}
            right={0}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => openActionsSheet()}
            >
              <Svg
                height='100%'
                width='100%'
              >
                <Defs>
                  <LinearGradient
                    id='grad'
                    x1='100%'
                    y1='0%'
                    x2='0%'
                    y2='5%'
                  >
                    <Stop
                      offset='1'
                      stopColor={colors.gray[400]}
                      stopOpacity={'0.6'}
                    />

                    <Stop
                      offset='74%'
                      stopColor={colors.gray[400]}
                    />
                  </LinearGradient>
                </Defs>
                <Rect
                  width='100%'
                  height='100%'
                  fill='url(#grad)'
                  rx='10'
                />
                <VStack
                  h='full'
                  w='full'
                  justifyContent={'center'}
                >
                  <MaterialIcons
                    name='add-a-photo'
                    size={RFValue(36)}
                    color={
                      errors.imagem_url ? colors.purple[500] : colors.blue[700]
                    }
                    style={{ alignSelf: 'center' }}
                  />
                </VStack>
              </Svg>
            </TouchableOpacity>
          </HStack>
        </HStack>
        {images.length !== 0 && (
          <Text
            fontSize={RFValue(12)}
            fontFamily='body'
            fontWeight='light'
            color='#4a4a4a'
          >
            pressione e segure uma imagem para removê-la
          </Text>
        )}
      </VStack>

      <VStack h={'1/6'}>
        <Button
          alignSelf={'center'}
          w='98%'
          mt={8}
          _pressed={{ bgColor: colors.blue[700] }}
          borderRadius={8}
          onPress={handleCheckInfo}
        >
          <Text
            color={colors.gray[100]}
            fontWeight='semibold'
            fontFamily={'body'}
            fontSize={RFValue(18)}
          >
            Continuar
          </Text>
        </Button>
      </VStack>

      <BottomSheetBase
        ref={bottomSheetRef}
        PanDownToClose
      >
        <CustomImagePickerBottomSheet />
      </BottomSheetBase>
    </VStack>
  )
}
{
  /* <Controller
              control={control}
              name='imagem_url'
              render={() => (
                <HStack mt={4}>
                  <HStack
                    w='80%'
                    alignItems='center'
                  >
                    {isLoadingImage ? (
                      <LoadingImage />
                    ) : (
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={images}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onLongPress={() => removeImage(item)}
                          >
                            <MaterialIcons
                              name='remove-circle'
                              color='#FF0000'
                              style={{
                                alignSelf: 'flex-end',
                                position: 'absolute',
                                zIndex: 1000,
                              }}
                            ></MaterialIcons>
                            <Image
                              source={{ uri: item }}
                              style={{ width: 50, height: 50, borderRadius: 4 }}
                              ml={2}
                              alt='Imagem do produto,selecionada da galeria'
                            />
                          </TouchableOpacity>
                        )}
                        ListEmptyComponent={() => (
                          <Text
                            color={
                              errors.imagem_url
                                ? colors.purple[500]
                                : colors.gray[400]
                            }
                            fontSize={RFValue(12)}
                          >
                            {emptyImage
                              ? 'Adicione uma imagem'
                              : 'Nenhuma imagem selecionada'}
                          </Text>
                        )}
                      />
                    )}
                  </HStack>
                  <TouchableOpacity
                    onPress={() => openActionsSheet(0, 'image')}
                    ml={4}
                  >
                    <MaterialIcons
                      name='add-a-photo'
                      size={RFValue(50)}
                      color={
                        errors.imagem_url
                          ? colors.purple[500]
                          : colors.blue[700]
                      }
                    />
                  </TouchableOpacity>
                </HStack>
              )}
            /> */
}
