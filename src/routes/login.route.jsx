import { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/Login'
import { Loading } from '../components/Loading'
import { Register } from '../screens/Register'
import { PasswordRecovery } from '../screens/PasswordRecovery'
import { PolicyScreen } from '../screens/PolicyScreen'
import { OnboardingRoutes } from './onboarding.route'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isUndefined } from 'lodash'

const { Navigator, Screen } = createNativeStackNavigator()

export function LoginRoutes() {
  const [AlreadyUsed, setAlreadyUsed] = useState()
  async function VerifyIfUserAlreadyUsedTheApp() {
    let userAlreadyUsed = await AsyncStorage.getItem('UserAlreadyUsed')
    setAlreadyUsed(userAlreadyUsed)
  }
  useEffect(() => {
    VerifyIfUserAlreadyUsedTheApp()
  }, [])
  console.log(AlreadyUsed)
  return (
    <>
      {isUndefined(AlreadyUsed) && <Loading />}
      <Navigator screenOptions={{ headerShown: false }}>
        {!AlreadyUsed && (
          <Screen
            name='OnboardingRoutes'
            component={OnboardingRoutes}
          />
        )}

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
    </>
  )
}
