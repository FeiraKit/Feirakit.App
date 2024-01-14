import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Home } from '../screens/Home'
import { Description } from '../screens/Description'
import { CustomDrawer } from '../components/CustomDrawer'
import { MyProducts } from '../screens/MyProducts'
import { MyAccount } from '../screens/MyAccount'
import { Sobre } from '../screens/Sobre'
import { ChangePassword } from '../screens/ChangePassword'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'native-base'
import { MultistepRoutes } from '../routes/MultistepForm.route'
import { EditProduct } from '../screens/EditProduct'

const { Navigator, Screen } = createNativeStackNavigator()

const Drawer = createDrawerNavigator()

function ProductRoutes() {
  const { colors } = useTheme()
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='MyProducts'
        component={MyProducts}
      />
      <Screen
        name='EditProduct'
        component={EditProduct}
      />
      <Screen
        name='MultiStepForm'
        component={MultistepRoutes}
      />
    </Navigator>
  )
}
function MyAccountRoutes() {
  const { colors } = useTheme()
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='MyAccount'
        component={MyAccount}
      />
      <Screen
        name='ChangePassword'
        component={ChangePassword}
      />
    </Navigator>
  )
}
function HomeDrawer() {
  const { colors } = useTheme()
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerActiveBackgroundColor: colors.blue[500],
        drawerActiveTintColor: colors.gray[200],
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Montserrat_500Medium',
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name='Início'
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name='home-outline'
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Meus Produtos'
        component={ProductRoutes}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name='basket-outline'
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name='Minha Conta'
        component={MyAccountRoutes}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name='person-circle-outline'
              size={25}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name='Sobre'
        component={Sobre}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name='help-circle-outline'
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='homeStack'
        component={HomeDrawer}
      />
      <Screen
        name='description'
        component={Description}
      />
      <Screen
        name='myaccount'
        component={MyAccount}
      />
    </Navigator>
  )
}
