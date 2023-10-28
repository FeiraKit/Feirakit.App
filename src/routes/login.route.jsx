import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/Login'
import { Register } from '../screens/Register'
import { PasswordRecovery } from '../screens/PasswordRecovery'
import { PolicyScreen } from '../screens/PolicyScreen'
import { OnboardingRoutes } from './onboarding.route'

const { Navigator, Screen } = createNativeStackNavigator()

export function LoginRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='OnboardingRoutes'
        component={OnboardingRoutes}
      />
      <Screen
        name='SignIn'
        component={Login}
      />
      <Screen
        name='Register'
        component={Register}
      />
      <Screen
        name='PasswordRecovery'
        component={PasswordRecovery}
      />
      <Screen
        name='PolicyAndTerms'
        component={PolicyScreen}
      />
    </Navigator>
  )
}
