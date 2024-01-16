const initialState = {
  authToken: null,
  userData: {},
  anyData: [],
};

export default (action, state = initialState) => {
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
