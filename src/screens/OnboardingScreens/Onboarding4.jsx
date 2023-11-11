import React from 'react'
import { ScreenContent } from './components/ScreenContent'

export function Onboarding4() {
  return (
    <ScreenContent
      BtnText='Iniciar'
      NextPage='SignIn'
      ScreenTitle='Vamos começar!'
      TextDescription='Crie sua conta e aproveite uma feira livre na palma da sua mão'
      urlImage={require('./assets/Foto4.png')}
      PageActive={4}
    />
  )
}
