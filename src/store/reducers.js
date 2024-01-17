/* eslint-disable default-param-last */
const initialState = {
  authToken: null,
  userData: {},
  anyData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authToken: action.payload.authToken,
        userData: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        authToken: null,
        userData: {},
      };
    default:
      return state;
  }
};
