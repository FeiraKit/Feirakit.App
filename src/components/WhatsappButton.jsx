import React from 'react'
import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { useSelector } from 'react-redux'
import { FontAwesome5 } from '@expo/vector-icons'
import { styles } from './styles/WhatsappButtonStyles'

export function WhatsappButton({
  Name,
  WhatsAppNumber,
  Quantity,
  unity,
  ProductName,
  ProductPrice,
}) {
  const user = useSelector((state) => state.AuthReducers.userData.userData).nome
  const adress = useSelector(
    (state) => state.AuthReducers.userData.userData
  ).endereco
  let isPluralQuantity = Quantity > 1 ? unity + 's' : unity
  let Message = `_*Pedido Feira Kit 🛒*_\nOlá ${Name}, tudo bem?\ngostaria de comprar *${Quantity} ${isPluralQuantity}* do produto "${ProductName}". Obrigado!\n__________________________\n_*Resumo :*_\n*Produto*: ${ProductName}\n*Quantidade*: ${Quantity} ${isPluralQuantity}\n*Preço*:R$ ${(
    Quantity * parseFloat(ProductPrice)
  ).toFixed(2)}\n*Cliente*: ${user}\n*Endereço*: ${adress.rua}, ${
    adress.numero
  }, ${adress.bairro}, ${adress.cidade}-${adress.estado}
  `
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() =>
          Linking.canOpenURL(
            `whatsapp://send?phone=55${WhatsAppNumber}&text=${Message}`
          ).then((supported) => {
            if (supported) {
              return Linking.openURL(
                `whatsapp://send?phone=55${WhatsAppNumber}&text= ${Message}`
              )
            } else {
              return Linking.openURL(
                `https://api.whatsapp.com/send?phone=55${WhatsAppNumber}&text=${Message}`
              )
            }
          })
        }
      >
        <Text style={styles.title}>
          <FontAwesome5
            size={20}
            name='whatsapp'
          />{' '}
          COMPRAR
        </Text>
      </TouchableOpacity>
    </View>
  )
}
