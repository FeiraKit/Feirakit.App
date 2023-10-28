import React from 'react'
import { VStack, Center, Image, Text, Button, useTheme } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { ScreenContent } from './components/ScreenContent'

export function Onboarding2() {
  return (
    < ScreenContent BtnText='Continue' NextPage='Onboarding3' ScreenTitle= 'Facilidade na sua mão' TextDescription= 'Facilite suas compras diárias e apoie produtores locais' urlImage= {require('./assets/Foto2.png')}/>
  )
}