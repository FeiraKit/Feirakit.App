import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/Login'
import { Register } from '../screens/Register'
import { PasswordRecovery } from '../screens/PasswordRecovery'
import { PolicyScreen } from '../screens/PolicyScreen'
import { OnboardingRoutes } from './onboarding.route'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { useState } from 'react'

const { Navigator, Screen } = createNativeStackNavigator()

export function LoginRoutes() {
  const [UserAlreadyUsed, setUserAlreadyUsed]= useState(null)

  useEffect (() => {async() => {

  let AlreadyUsed
  AlreadyUsed =  await  AsyncStorage.getItem("UserAlreadyUsed")
  setUserAlreadyUsed(!!AlreadyUsed)
  console.log(AlreadyUsed)}},[])

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      { !UserAlreadyUsed && <Screen
        name='OnboardingRoutes'
        component={OnboardingRoutes}
      />}
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
