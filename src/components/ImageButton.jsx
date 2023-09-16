import React,{useState} from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "native-base";

export default function ImageButton({urlImage, onPress,active}) {
  const [isLoadingImage,setIsloadingImage]=useState(true)
  const {colors}=useTheme()
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.container}  borderColor={active ? colors.blue[500]: colors.gray[250]}>
        {isLoadingImage &&
        <ActivityIndicator size={40} color={colors.gray[400]} style={{alignSelf:'center',position:'absolute',zIndex:1000}}/>
        }
        <ImageBackground
          borderRadius={12}
          source={{uri:urlImage}}
          resizeMode="cover"
          style={style.image}
          onLoad={()=>setIsloadingImage(false)}
        />
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    padding:2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 3,
    marginHorizontal: 5,
    marginVertical: 35,
    marginRight: 10,
    marginLeft: 10,
  },

  image: {
    width: 90,
    height: 90,
    justifyContent: "center",
    flex: 1,
    alignItems:'center',
  },
});
