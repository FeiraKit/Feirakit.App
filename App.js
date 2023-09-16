import 'react-native-gesture-handler' ;
import { StatusBar} from 'react-native';
import { store } from "./src/store"
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_500Medium,
  Montserrat_100Thin,
} from "@expo-google-fonts/montserrat";
import { THEME } from "./src/styles/theme";
import FlashMessage from "react-native-flash-message";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import { Provider } from "react-redux";
export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_500Medium,
    Montserrat_100Thin,
  }); 
   
  return (
    <Provider store={store}>
        <StatusBar backgroundColor='#000' barStyle='light-content'/>
        <NativeBaseProvider theme={THEME}>
        <FlashMessage position="top" />
          {fontsLoaded ? <Routes /> : <Loading />}
        </NativeBaseProvider>
    </Provider>
  );    
}   