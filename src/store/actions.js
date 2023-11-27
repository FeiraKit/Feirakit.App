import AsyncStorage from '@react-native-async-storage/async-storage'

export const Init = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('token')
    let user = JSON.parse(await AsyncStorage.getItem('user'))
    if (token !== null) {
      let payload = {
        authToken: token,
        userData: user,
      }

      dispatch({
        type: 'LOGIN',
        payload: payload,
      })
    }
  }
}

export const Login = (user, jwtToken) => {
  return async (dispatch) => {
    await AsyncStorage.setItem('token', jwtToken)
    await AsyncStorage.setItem('user', JSON.stringify(user))

    let payload = {
      authToken: jwtToken,
      userData: user,
    }
    dispatch({
      type: 'LOGIN',
      payload: payload,
    })
  }
}

export const Logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('user')
    dispatch({
      type: 'LOGOUT',
    })
  }
}
