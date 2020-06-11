import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isUserAuthenticated: false
};

const authSuccess = (state, action) => {
  return {
    ...state,
    isUserAuthenticated: true
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    isUserAuthenticated: false
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    isUserAuthenticated: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
};

export default reducer;
