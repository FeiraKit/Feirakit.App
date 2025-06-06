import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { Login as loginAction } from '../store/actions';

import apiFeiraKit from './ApiFeiraKit';

export class User {
  jwt = useSelector((state) => state.AuthReducers.authToken);

  dispatch = useDispatch();

  async checkPassword(email, password) {
    const credentials = {
      email,
      senha: password,
    };

    const result = await apiFeiraKit
      .post('/users/login', JSON.stringify(credentials))
      .then(({ data }) => {
        if (!data) {
          return null;
        }
        return data;
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          return error.response.data;
        }
        return null;
      });

    return result;
  }

  async getUserByEmail(email, jwtToken) {
    await apiFeiraKit
      .get(`/users/byemail/?email=${email}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then(({ data }) => {
        this.login(data.resultado[0], jwtToken);
      })
      .catch(() => Alert.alert('Erro', 'Um erro inesperado aconteceu,tente novamente'));
  }

  async getUserById(id) {
    return await apiFeiraKit.get(`/users/byuserid/?id=${id}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    });
  }

  async createUser(user) {
    return await apiFeiraKit.post('/users', JSON.stringify(user));
  }

  async changePassword(newPasswordData) {
    return await apiFeiraKit.post('/users/change-password', newPasswordData, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    });
  }

  async recoverPassword(recoverPasswordData) {
    return await apiFeiraKit.post('/users/send_email', recoverPasswordData);
  }

  async editUser(user) {
    return await apiFeiraKit.put('/users', user, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    });
  }

  async deleteUser(id) {
    return await apiFeiraKit.delete('/users', {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
      data: id,
    });
  }

  async login(userData, jwtToken) {
    this.dispatch(loginAction(userData, jwtToken));
  }
}
