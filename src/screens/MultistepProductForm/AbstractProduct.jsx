import { useRoute } from '@react-navigation/native';
import { Button, HStack, Text, VStack, useTheme } from 'native-base';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import { Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ButtonBack } from '../../components/ButtonBack';
import { LogoFeira } from '../../components/LogoFeira';

import BottomSheetBase from './components/BottomSheetBase';

import { CustonBottonSheetShowList } from '../../components/FormComponents/CustonBottonSheetShowList';
import { uploadImages } from '../../utils/UploadImages';
import { LoadingUploadImages } from '../../components/Loading';

export function AbstractProduct() {
  const route = useRoute();
  const { colors } = useTheme();
  const prevProduct = route.params.produto;
  const bottomSheetRef = useRef(BottomSheetBase);
  const [expandTitle, setExpandTitle] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingProduct, setUploadingProduct] = useState(false);
  const date = moment().format('DD/MM/YYYY');

  const openBottomSheet = useCallback(async () => {
    bottomSheetRef.current?.snapToIndex(prevProduct.cidades.length < 5 ? 0 : 1);
  }, []);
  const closeBottomSheet = useCallback(async () => {
    bottomSheetRef.current?.close();
  }, []);

  const handleCheckInfo = async () => {
    setUploadingProduct(true);
    prevProduct.validade = moment().format('YYYY-MM-DD');
    const productSlug = prevProduct.nome.slice(0, 5);
    await uploadImages(prevProduct.imagem_url, productSlug, setUploadedImages);
  };

  useEffect(() => {
    const totalProgress = Math.ceil((uploadedImages.length * 100) / prevProduct.imagem_url.length);
    // eslint-disable-next-line no-restricted-globals
    setUploadProgress(isNaN(totalProgress) ? 0 : totalProgress);

    if (prevProduct.imagem_url.length === uploadedImages.length) {
      prevProduct.imagem_url = uploadedImages;
      console.log(prevProduct);
      console.log('enviar produto ao banco');
      setUploadingProduct(false);
    }
  }, [uploadedImages]);
  return (
    <TouchableWithoutFeedback touchSoundDisabled onPress={closeBottomSheet}>
      <VStack w="full" h="full" px="3%">
        {uploadingProduct && <LoadingUploadImages percent={uploadProgress} />}
        <VStack h="1/6">
          <ButtonBack />
          <LogoFeira />
          <Text fontFamily="body" fontSize={RFValue(22)} textAlign="left">
            Resumo do produto
          </Text>
        </VStack>

        <VStack h="4/6" w="full" alignItems="center">
          <VStack borderRadius={RFValue(4)} alignContent="center">
            <Image
              source={{ uri: prevProduct.imagem_url[0] }}
              style={{
                width: RFValue(130),
                height: RFValue(100),
                borderRadius: RFValue(4),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </VStack>

          <VStack
            mt={RFValue(4)}
            borderTopRadius={RFValue(8)}
            w="100%"
            flex={1}
            borderWidth={1}
            borderColor={colors.blue[900]}
          >
            <HStack h="1/6" borderBottomWidth={1} marginX={1} borderBottomColor={colors.blue[850]}>
              {prevProduct.bestbefore && (
                <VStack h="100%" width="1/6" alignContent="center" justifyContent="center">
                  <FontAwesome5
                    name="medal"
                    size={30}
                    style={{
                      color: colors.green[600],
                      alignSelf: 'center',
                    }}
                  />
                </VStack>
              )}
              <VStack flex={1} maxW="100%" maxH="100%" px={RFValue(1)}>
                <VStack>
                  <TouchableWithoutFeedback
                    touchSoundDisabled
                    onPressIn={() => {
                      setExpandTitle(true);
                    }}
                    onPressOut={() => {
                      setExpandTitle(false);
                    }}
                  >
                    <Text
                      fontFamily="heading"
                      fontSize={RFValue(18)}
                      textTransform="capitalize"
                      textAlign="left"
                      numberOfLines={expandTitle ? 2 : 1}
                      lineBreakMode="tail"
                    >
                      {prevProduct.nome}
                    </Text>
                  </TouchableWithoutFeedback>
                </VStack>
                <HStack
                  maxW="100%"
                  alignContent="space-between"
                  justifyContent="space-between"
                  h="1/2"
                  style={{ display: expandTitle ? 'none' : 'flex' }}
                >
                  <Text
                    fontFamily="body"
                    fontSize={RFValue(16)}
                    textTransform="capitalize"
                    textAlign="left"
                  >
                    {prevProduct.categoria}
                  </Text>

                  <Text
                    fontFamily="heading"
                    fontSize={RFValue(18)}
                    textTransform="capitalize"
                    color={colors.green[600]}
                    textAlign="left"
                  >
                    R${prevProduct.preco.replace('.', ',')}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            {prevProduct.bestbefore && (
              <VStack marginX={1}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'left',
                    color: colors.green[600],
                  }}
                >
                  o produto será colhido após a compra
                </Text>
              </VStack>
            )}

            <VStack h="3/6" mx={1} paddingY={1}>
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: 10,
                  backgroundColor: colors.gray[250],
                }}
              >
                <Text style={{ fontSize: 16, textAlign: 'left' }} fontFamily="body">
                  {prevProduct.descricao}
                </Text>
              </ScrollView>
            </VStack>
            <HStack h="1/6" mt={RFValue(4)}>
              <VStack w="1/6" justifyContent="center" alignContent="center" alignItems="center">
                <MaterialIcons name="place" size={30} />
              </VStack>
              <VStack w="5/6" justifyContent="center">
                <TouchableOpacity onPress={openBottomSheet}>
                  <Text fontFamily="heading" fontSize={RFValue(18)} color={colors.blueGray[600]}>
                    Disponível em {prevProduct.cidades.length} cidade
                    {prevProduct.cidades.length > 1 && 's'}
                  </Text>
                </TouchableOpacity>
              </VStack>
            </HStack>
            <Text
              fontSize={RFValue(14)}
              alignSelf="center"
              fontFamily="heading"
              color={colors.blue[700]}
            >
              {date}
            </Text>
          </VStack>
        </VStack>

        <VStack h="1/6">
          <Button
            alignSelf="center"
            w="98%"
            mt={8}
            _pressed={{ bgColor: colors.blue[700] }}
            borderRadius={8}
            onPress={handleCheckInfo}
          >
            <Text
              color={colors.gray[100]}
              fontWeight="semibold"
              fontFamily="body"
              fontSize={RFValue(18)}
            >
              Cadastrar Produto
            </Text>
          </Button>
        </VStack>

        <BottomSheetBase ref={bottomSheetRef} PanDownToClose>
          <CustonBottonSheetShowList items={prevProduct.cidades} actionClose={closeBottomSheet} />
        </BottomSheetBase>
      </VStack>
    </TouchableWithoutFeedback>
  );
}
