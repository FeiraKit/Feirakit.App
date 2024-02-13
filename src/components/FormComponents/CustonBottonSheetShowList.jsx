import React from 'react'
import { Button, VStack, HStack, Heading, useTheme } from 'native-base'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { RFValue } from 'react-native-responsive-fontsize'
import { TouchableOpacity } from 'react-native'

export function CustonBottonSheetShowList({ items, actionClose }) {
  const { colors } = useTheme()
  return (
    <VStack>
      <VStack
        position={'relative'}
        h={'5/6'}
        paddingX={RFValue(4)}
      >
        <BottomSheetFlatList
          data={items}
          keyExtractor={(item) => item}
          renderItem={({ index }) => (
            <HStack
              flex={1}
              width='100%'
              mt={2}
            >
              <TouchableOpacity
                style={{
                  width: '100%',
                  marginVertical: 2,
                  flexDirection: 'row',
                  paddingVertical: 2,
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: colors.blue[850],
                }}
                activeOpacity={0.7}
              >
                <Heading
                  fontSize={RFValue(18)}
                  fontFamily='body'
                  fontWeight='semibold'
                  w='90%'
                  ml='2%'
                >
                  {items[index]}
                </Heading>
              </TouchableOpacity>
            </HStack>
          )}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
      <VStack h='1/6'>
        <Button
          mt={RFValue(4)}
          w={'80%'}
          alignSelf={'center'}
          onPress={() => actionClose()}
        >
          Fechar
        </Button>
      </VStack>
    </VStack>
  )
}
