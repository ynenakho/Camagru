import {
  AUTH_USER,
  AUTH_ERROR,
  GET_CURRENT_USER,
  USER_ERROR,
  AuthActionType,
  UserType,
} from './types';
import setAuthToken from '../components/common/setAuthToken';
import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxState } from 'reducers';

type UserDataType = {
  username: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  getNotified: boolean;
};

export const updateProfile = (userData: UserDataType, callback: () => void) => (
  dispatch: ThunkDispatch<ReduxState, void, AuthActionType>
) =>
  axios
    .post('/api/updateprofile', userData)
    .then((response) => {
      dispatch({
        type: AUTH_USER,
        payload: response.data.token,
      });
      localStorage.setItem('jwtToken', response.data.token);
      setAuthToken(response.data.token);
      dispatch(setCurrentUser(response.data.token));
      callback();
    })
    .catch((e) => {
      dispatch({
        type: AUTH_ERROR,
        payload: e.response.data.message,
      });
    });

export const setCurrentUser = (token: string) => (
  dispatch: ThunkDispatch<ReduxState, void, AuthActionType>
) => {
  axios
    .get('/api/current')
    .then((response) => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: response.data,
      });
      dispatch({
        type: AUTH_USER,
        payload: token,
      });
    })
    .catch((e) =>
      dispatch({
        type: USER_ERROR,
        payload: e.response.data.message,
      })
    );
};

export const signup = (
  {
    email,
    password,
    username,
  }: { email: string; password: string; username: string },
  callback: () => void
) => (dispatch: ThunkDispatch<ReduxState, void, AuthActionType>) =>
  axios
    .post('/api/signup', {
      email,
      password,
      username,
    })
    .then(() => callback())
    .catch((e) => {
      dispatch({
        type: AUTH_ERROR,
        payload: e.response.data.message,
      });
    });

export const signin = (
  { username, password }: { username: string; password: string },
  callback: () => void
) => (dispatch: ThunkDispatch<ReduxState, void, AuthActionType>) =>
  axios
    .post('/api/signin', {
      username,
      password,
    })
    .then((response) => {
      dispatch({
        type: AUTH_USER,
        payload: response.data.token,
      });
      localStorage.setItem('jwtToken', response.data.token);
      setAuthToken(response.data.token);
      dispatch(setCurrentUser(response.data.token));
      callback();
    })
    .catch((e) => {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Incorrect Username/Password.',
        // payload: e.response.data,
      });
    });

export const signout = () => (
  dispatch: ThunkDispatch<ReduxState, void, AuthActionType>
) => {
  localStorage.removeItem('jwtToken');
  setAuthToken('');
  dispatch({
    type: GET_CURRENT_USER,
    payload: {} as UserType,
  });
  dispatch({
    type: AUTH_USER,
    payload: '',
  });
};

export const forgotPassword = (
  { email }: { email: string },
  callback: () => void
) => (dispatch: Dispatch) =>
  axios
    .post('/api/forgotpassword', { email })
    .then(() => callback())
    .catch((e) => {
      dispatch({
        type: AUTH_ERROR,
        payload: e.response.data.message,
      });
    });

export const clearErrors = () => (dispatch: Dispatch) => {
  dispatch({ type: AUTH_ERROR, payload: '' });
};
