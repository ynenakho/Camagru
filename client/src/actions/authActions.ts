import {
  AUTH_USER,
  AUTH_ERROR,
  GET_CURRENT_USER,
  USER_ERROR,
  AuthActionType,
  UserType,
} from './types';
import { SubmissionError } from 'redux-form';
import setAuthToken from '../components/common/setAuthToken';
import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxState } from 'reducers';

type UserDataType = {
  username: string;
  email: string;
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
        payload: e.response.data,
      });
      throw new SubmissionError({
        _error: e.response.data.error,
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
        payload: e.response.data,
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
        payload: e.response.data,
      });
      throw new SubmissionError({
        _error: e.response.data.error,
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
        payload: e.response.data,
      });
      console.log('HERE', e.response);

      throw new SubmissionError({
        _error: 'Incorrect Username/Password.',
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
    .then((response) => callback())
    .catch((e) => {
      dispatch({
        type: AUTH_ERROR,
        payload: e.response.data,
      });
      throw new SubmissionError({
        _error: e.response.data.error,
      });
    });
