import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, useTheme, View } from "native-base";
import { Image, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch,useSelector } from "react-redux";
import { Logout } from "../store/actions";

const texts = {
  title: "Sair",
  description: "Deseja mesmo sair?",
  optionYes: "Sim",
  optionNo: "Não",
  
};

export function CustomDrawer(props) {
  const user = useSelector((state) => state.AuthReducers.userData.userData)
  const dispatch = useDispatch();
  const HandleLogOut = () => {
    Alert.alert(texts.title, texts.description, [
      {
        text: texts.optionYes,
        onPress: () => {
          dispatch(Logout());
          return;
        },
      },
      {
        text: texts.optionNo,
        onPress: () => {
        },
      },
    ]);
  };

  const { colors } = useTheme();
  return (
    <View flex={1} style={{ backgroundColor: colors.gray[200] }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: colors.blue[500],
          paddingTop: 60,
        }}
      >
        <Image
          source={require("../assets/user.png")}
          style={{
            height: 70,
            width: 70,
            marginBottom: 10,
            marginHorizontal: 10,
          }}
        />
        <Text
          style={{
            color: colors.gray[200],
            fontSize: 18,
            fontFamily: "Montserrat_700Bold",
            marginHorizontal: 10,
            paddingBottom: 10,
          }}
        >
          {user.nome}
        </Text>
        <View style={{ backgroundColor: colors.gray[200], paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 10,
          paddingBottom: 20,
          borderTopColor: colors.gray[300],
          borderTopWidth: 2,
        }}
      >
        <TouchableOpacity onPress={HandleLogOut}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <MaterialIcons name="logout" size={20} color={colors.purple[500]} />
            <Text style={{ marginLeft: 8, fontSize: 18 }}>Sair</Text>
          </View>
        </TouchableOpacity>

        <View>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              color: colors.gray[300],
              marginTop: 25,
            }}
          >
            FeiraKit
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 12,
              color: colors.gray[300],
              marginTop: -5,
            }}
          >
            1.0.0
          </Text>
        </View>
      </View>
    </View>
  );
}
