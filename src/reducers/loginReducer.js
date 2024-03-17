const loginReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return action.payload;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return {
    type: 'LOGIN',
    payload: user,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
    payload: null,
  };
};

export default loginReducer;
