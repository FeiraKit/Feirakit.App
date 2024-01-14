import React, { useState } from 'react'
import {
  View,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from 'native-base'
import { styles } from './styles/ImageButtonStyles'

export default function ImageButton({ urlImage, onPress, active }) {
  const [isLoadingImage, setIsloadingImage] = useState(true)
  const { colors } = useTheme()
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={styles.container}
        borderColor={active ? colors.blue[500] : colors.gray[250]}
      >
        {isLoadingImage && (
          <ActivityIndicator
            size={40}
            color={colors.gray[400]}
            styles={{ alignSelf: 'center', position: 'absolute', zIndex: 1000 }}
          />
        )}
        <ImageBackground
          borderRadius={12}
          source={{ uri: urlImage }}
          resizeMode='cover'
          style={styles.image}
          onLoad={() => setIsloadingImage(false)}
        />
      </View>
    </TouchableOpacity>
  )
}
