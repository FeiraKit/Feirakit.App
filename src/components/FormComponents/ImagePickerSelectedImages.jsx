import React, { useState } from 'react';
import { FlatList, Text, VStack, HStack, useTheme } from 'native-base';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, Image, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { LoadingImage } from '../Loading';

export function ImagePickerSelectedImages({
  images,
  editionMode,
  handleImage,
  changeColor,
  actionShowImage,
  actionOpenBottomSheet,
  setImageToRemove,
}) {
  const { colors } = useTheme();
  const [isLoadingImage] = useState();

  const removeImage = (index) => {
    Alert.alert('Remover', 'Deseja remover esta imagem?', [
      {
        text: 'Não',
        onPress: () => {},
      },
      {
        text: 'Sim',
        onPress: () => {
          const newImages = images.filter((image, i) => i !== index);
          handleImage(newImages);
          if (editionMode) {
            setImageToRemove((prevState) => [...prevState, images[index]]);
          }
          if (newImages.length > 1 && !editionMode) {
            actionShowImage(index - 1);
          }
        },
      },
    ]);
  };

  return (
    <>
      <HStack mt={8} maxW="full" h={RFValue(56)}>
        <HStack alignItems="center" maxW="98%" borderRadius={RFValue(8)}>
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
                height: RFValue(56),
              }}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (!editionMode) {
                      actionShowImage(index);
                    }
                  }}
                  onLongPress={() => removeImage(index)}
                >
                  <MaterialIcons
                    name="remove-circle"
                    color={colors.red[500]}
                    style={{
                      alignSelf: 'flex-start',
                      position: 'absolute',
                      zIndex: 10,
                    }}
                  />

                  <Image
                    source={{ uri: item }}
                    style={{
                      marginRight: RFValue(4),
                      marginLeft: RFValue(1),
                      width: RFValue(56),
                      height: RFValue(56),
                      borderRadius: 4,
                    }}
                    alt="Imagem do produto,selecionada da galeria"
                  />
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <HStack
                  h={RFValue(56)}
                  flexDirection="column"
                  justifyContent="center"
                  marginRight={RFValue(5)}
                >
                  <Text
                    color={changeColor ? colors.purple[500] : colors.gray[400]}
                    fontSize={RFValue(12)}
                  >
                    Nenhuma imagem selecionada
                  </Text>
                </HStack>
              )}
            />
          )}
        </HStack>

        <HStack
          w="1/6"
          position="absolute"
          h="full"
          minH={RFValue(56)}
          right={0}
          justifyContent="center"
          alignItems="center"
        >
          <TouchableOpacity
            style={{ flex: 1, height: RFValue(56) }}
            onPress={() => actionOpenBottomSheet()}
            disabled={images.length >= 10}
          >
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="grad" x1="100%" y1="0%" x2="0%" y2="5%">
                  <Stop offset="1" stopColor={colors.gray[400]} stopOpacity="0.6" />

                  <Stop offset="74%" stopColor={colors.gray[400]} />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#grad)" rx="10" />
              <VStack h="full" w="full" justifyContent="center">
                <MaterialIcons
                  name={images.length < 10 ? 'add-a-photo' : 'done-all'}
                  size={RFValue(36)}
                  color={changeColor ? colors.purple[500] : colors.blue[700]}
                  style={{ alignSelf: 'center' }}
                />
              </VStack>
            </Svg>
          </TouchableOpacity>
        </HStack>
      </HStack>
      {images.length !== 0 && (
        <Text fontSize={RFValue(12)} fontFamily="body" fontWeight="light" color={colors.gray[500]}>
          pressione e segure uma imagem para removê-la
        </Text>
      )}
      {images.length >= 10 && (
        <Text
          fontSize={RFValue(10)}
          fontFamily="body"
          fontWeight="light"
          color={colors.gray[500]}
          paddingTop={2}
          borderBottomWidth={1}
        >
          Você pode adicionar apenas 10 imagens por produto
        </Text>
      )}
    </>
  );
}
