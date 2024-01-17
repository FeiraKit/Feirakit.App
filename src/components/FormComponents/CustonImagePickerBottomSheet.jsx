import React from 'react';
import { Heading, HStack, VStack, useTheme } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export function CustomImagePickerBottomSheet({ handleImage, actionCloseBottonSheet }) {
  const { colors } = useTheme();

  const getImagesFromGalery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (result.assets) {
      const selectedImages = [];
      result.assets.map((image) => {
        if (selectedImages.includes(image.uri)) {
          return;
        }
        selectedImages.push(image.uri);
      });
      handleImage((prevState) => [...prevState, ...selectedImages]);
    }
    actionCloseBottonSheet();
  };

  const getImagesByCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        'Permissão',
        'Você se recusou a permitir que este aplicativo acesse sua câmera.Por favor,conceda esta permição para continuar o cadastro do produto'
      );
      return;
    }

    const cameraResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: 'Images',
      quality: 0.8,
    });

    if (cameraResult.assets) {
      const selectedImages = [];
      cameraResult.assets.map((image) => selectedImages.push(image.uri));
      handleImage((prevState) => [...prevState, ...selectedImages]);
    }
  };

  return (
    <HStack justifyContent="center" mt={4}>
      <TouchableOpacity style={{ width: '45%', height: '100%' }} onPress={getImagesByCamera}>
        <VStack alignItems="center" justifyContent="center">
          <MaterialIcons name="camera-alt" size={RFValue(70)} color={colors.blue[700]} />
          <Heading color={colors.gray[500]} fontSize={RFValue(16)}>
            Câmera
          </Heading>
        </VStack>
      </TouchableOpacity>

      <TouchableOpacity style={{ width: '45%', height: '100%' }} onPress={getImagesFromGalery}>
        <VStack alignItems="center" justifyContent="center">
          <MaterialIcons name="photo-library" size={RFValue(70)} color={colors.blue[700]} />
          <Heading color={colors.gray[500]} fontSize={RFValue(16)}>
            Galeria
          </Heading>
        </VStack>
      </TouchableOpacity>
    </HStack>
  );
}
