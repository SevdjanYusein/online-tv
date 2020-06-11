import * as actionTypes from './actionTypes';
import myFetch from '../services/FetchWrapper';
import { LOGIN_PATH } from '../constants/constants';

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const login = (email, password, rememberme) => {
  return dispatch => {
    myFetch(LOGIN_PATH, {
      method: 'POST',
      body: { email, password, rememberme }
    }).then(token => {
      let userToken = token.data;
      window.localStorage.setItem('userToken', JSON.stringify(userToken));
      dispatch(authSuccess(token));
    }).catch(error => {
      dispatch(authFail(error));
    });
  };
};

export const logout = () => {
  window.localStorage.removeItem('userToken');

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authCheckState = () => {
  return dispatch => {
    const loggedUser = window.localStorage.getItem('userToken');

    if (!loggedUser) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(loggedUser));
    }
  };
};
