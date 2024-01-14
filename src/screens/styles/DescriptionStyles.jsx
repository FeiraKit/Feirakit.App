import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
  },
  image: {
    resizeMode: 'center',
    height: '100%',
    width: '100%',
  },
  imagebox: {
    height: '30%',
    width: '70%',
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '-5%',
  },
  descriptionBox: {
    height: 'auto',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 20,
  },
  qtdButton: {
    height: '100%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0088a7',
  },
  text: {
    fontFamily: 'Montserrat_400Regular',
    marginVertical: 15,
  },

  btnActions: {
    borderWidth: 1,
    borderRadius: 8,
    width: '40%',
    paddingHorizontal: 16,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  actionsContainer: {
    borderRadius: 20,
    paddingVertical: 16,
    width: '90%',
    alignSelf: 'center',
  },
})
