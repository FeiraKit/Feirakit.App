import AsyncStorage from '@react-native-async-storage/async-storage';

export const Init = () => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  const user = JSON.parse(await AsyncStorage.getItem('user'));
  if (token !== null) {
    const payload = {
      authToken: token,
      userData: user,
    };

    dispatch({
      type: 'LOGIN',
      payload,
    });
  }
};

export const Login = (user, jwtToken) => async (dispatch) => {
  await AsyncStorage.setItem('token', jwtToken);
  await AsyncStorage.setItem('user', JSON.stringify(user));

  const payload = {
    authToken: jwtToken,
    userData: user,
  };
  dispatch({
    type: 'LOGIN',
    payload,
  });
};

export const Logout = () => async (dispatch) => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
  dispatch({
    type: 'LOGOUT',
  });
};
