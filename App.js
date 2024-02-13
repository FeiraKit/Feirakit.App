import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_500Medium,
  Montserrat_100Thin,
} from '@expo-google-fonts/montserrat';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { THEME } from './src/styles/theme';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_500Medium,
    Montserrat_100Thin,
  });

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <NativeBaseProvider theme={THEME}>
        <FlashMessage position="top" />
        {fontsLoaded ? <Routes /> : <Loading />}
      </NativeBaseProvider>
    </Provider>
  );
}
