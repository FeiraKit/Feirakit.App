import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, Text, VStack, useTheme } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { ProgressBar } from './components/ProgressBar'
import React, { useCallback, useRef } from 'react'
import { ButtonBack } from '../../components/ButtonBack'
import { LogoFeira } from '../../components/LogoFeira'
import { RFValue } from 'react-native-responsive-fontsize'
import { useEffect } from 'react'
import { useState } from 'react'
import BottomSheetBase from './components/BottomSheetBase'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { CustomImagePickerBottomSheet } from '../../components/FormComponents/CustonImagePickerBottomSheet'
import { ImagePickerSelectedImages } from '../../components/FormComponents/ImagePickerSelectedImages'
import { showMessage } from 'react-native-flash-message'

export function AddImages() {
  const route = useRoute()
  const navigation = useNavigation()
  const { colors } = useTheme()
  const prevProduct = route.params.produto

  const [images, setImages] = useState([])
  const [diplayImageIndex, setDisplayImageIndex] = useState(0)
  const [error, setError] = useState(false)

  const handleCheckInfo = () => {
    if (images.length === 0) {
      setError(true)
      return
    }
    prevProduct.imagem_url = images
    navigation.navigate('Abstract', { produto: prevProduct })
  }

  const bottomSheetRef = useRef(BottomSheetBase)

  const openActionsSheet = useCallback(async () => {
    bottomSheetRef.current?.snapToIndex(0)
  }, [])

  const closeActionsSheet = () => {
    bottomSheetRef.current?.close()
  }
  useEffect(() => {
    if (images.length > 0) {
      setError(false)
    }
    if (images.length === 10) {
      showMessage({
        message: 'Limite de imagens alcançado',
        type: 'info',
        duration: 4000,
      })
    }
  }, [images])

  return (
    <VStack
      w='full'
      h='full'
      px={'3%'}
    >
      <VStack h={'2/6'}>
        <ButtonBack />
        <LogoFeira />
        <ProgressBar percent='100' />
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
      >
        <VStack
          borderWidth={1}
          borderColor={error ? colors.purple[500] : colors.blue[700]}
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
                  color={error ? colors.purple[500] : colors.blue[700]}
                />
              </VStack>
            </TouchableOpacity>
          ) : (
            <Image
              source={{ uri: images[diplayImageIndex] }}
              style={{
                width: RFValue(130),
                height: RFValue(100),
                borderRadius: RFValue(2),
                alignSelf: 'center',
              }}
            />
          )}
        </VStack>

        <ImagePickerSelectedImages
          changeColor={error}
          images={images}
          handleImage={setImages}
          actionShowImage={setDisplayImageIndex}
          actionOpenBottomSheet={openActionsSheet}
        />
      </VStack>

      <VStack h={'1/6'}>
        <Button
          alignSelf={'center'}
          w='98%'
          mt={8}
          _pressed={{ bgColor: colors.blue[700] }}
          borderRadius={8}
          disabled={error}
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
        <CustomImagePickerBottomSheet
          images={images}
          handleImage={setImages}
          actionCloseBottonSheet={closeActionsSheet}
        />
      </BottomSheetBase>
    </VStack>
  )
}
