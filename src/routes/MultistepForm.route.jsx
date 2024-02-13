import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainInfo } from '../screens/MultistepProductForm/MainInfo'
import { DescriptionProduct } from '../screens/MultistepProductForm/DescriptionProduct'
import { AddCities } from '../screens/MultistepProductForm/AddCities'
import { AddImages } from '../screens/MultistepProductForm/AddImages'
import { AbstractProduct } from '../screens/MultistepProductForm/AbstractProduct'

const { Navigator, Screen } = createNativeStackNavigator()
export function MultistepRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Screen
        name='MainInfo'
        component={MainInfo}
      />
      <Screen
        name='DescriptionProduct'
        component={DescriptionProduct}
      />
      <Screen
        name='AddCities'
        component={AddCities}
      />
      <Screen
        name='AddImages'
        component={AddImages}
      />
      <Screen
        name='Abstract'
        component={AbstractProduct}
      />
    </Navigator>
  )
}
