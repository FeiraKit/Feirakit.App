import React from 'react'
import { VStack, Text, Heading, ScrollView, Button } from 'native-base'
import { POLICY, TERMS } from '../ConstantText'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ButtonBack } from '../components/ButtonBack'
import { LogoFeira } from '../components/LogoFeira'
import { RFValue } from 'react-native-responsive-fontsize'

export function PolicyScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { contentTextType } = route.params
  const contentText = contentTextType === 'termos' ? TERMS : POLICY
  const titleText =
    contentTextType === 'termos' ? 'Termos de uso' : 'Política de Privacidade '

  return (
    <VStack w='full'>
      <ButtonBack />
      <LogoFeira />
      <VStack
        w='full'
        px={'4%'}
      >
        <Heading
          my={1}
          alignSelf='center'
        >
          {titleText}
        </Heading>
        <ScrollView
          showsVerticalScrollIndicator={false}
          h='5/6'
          contentContainerStyle={{
            paddingBottom: RFValue(30),
          }}
        >
          <Text
            fontFamily='body'
            fontSize={RFValue(14)}
            textAlign={'justify'}
            marginTop={RFValue(4)}
          >
            {contentText}
          </Text>
          <Button
            my={4}
            onPress={() => {
              navigation.goBack()
            }}
            height={54}
            borderRadius={15}
          >
            Entendi
          </Button>
          <Text textAlign='center'>feiraKit@gmail.com</Text>
        </ScrollView>
      </VStack>
    </VStack>
  )
}
