import React from 'react';
import { ScreenContent } from './components/ScreenContent';

export function Onboarding1() {
  return (
    <ScreenContent
      BtnText="Continue"
      NextPage="Onboarding2"
      ScreenTitle="Bem-Vindo ao Feira Kit!"
      TextDescription="Descubra os melhores produtos da sua região, diretamente na palma da sua mão"
      urlImage={require('./assets/Foto1.png')}
      PageActive={1}
    />
  );
}
