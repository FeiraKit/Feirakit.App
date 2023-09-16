import apiFeiraKit from './ApiFeiraKit'
import { useDispatch } from 'react-redux'
import { Alert } from 'react-native'
import { Login as loginAction } from '../store/actions'
import { useSelector } from 'react-redux'

export class User {
  jwt = useSelector((state) => state.AuthReducers.authToken)
  dispatch = useDispatch()
  async checkPassword(email, password) {
    let credentials = {
      email,
      senha: password,
    }
    return await apiFeiraKit.post(
      '/users/check-password',
      JSON.stringify(credentials)
    )
  }

  async getUserByEmail(email, jwtToken) {
    await apiFeiraKit
      .get(`/users/byemail/?email=${email}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then(({ data }) => {
        this.login(data.resultado[0], jwtToken)
      })
      .catch((error) => {
        return Alert.alert(
          'Erro',
          'Um erro inesperado aconteceu,tente novamente'
        )
      })
  }

  async getUserById(id) {
    return await apiFeiraKit.get(`/users/byuserid/?id=${id}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
  }

  async createUser(user) {
    return await apiFeiraKit.post('/users', JSON.stringify(user))
  }

  async changePassword(newPasswordData) {
    return await apiFeiraKit.post('/users/change-password', newPasswordData, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
  }

  async recoverPassword(recoverPasswordData) {
    return await apiFeiraKit.post('/users/send_email', recoverPasswordData)
  }

  async editUser(user) {
    return await apiFeiraKit.put('/users', user, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
  }

  async deleteUser(id) {
    return await apiFeiraKit.delete('/users', {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
      data: id,
    })
  }

  async login(userData, jwtToken) {
    this.dispatch(loginAction(userData, jwtToken))
  }
}
