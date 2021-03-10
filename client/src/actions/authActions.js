import { AUTH_USER, AUTH_ERROR, GET_CURRENT_USER, USER_ERROR } from './types';
import { SubmissionError } from 'redux-form';
import setAuthToken from '../components/common/setAuthToken';
import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export const updateProfile = (userData, callback) => (dispatch) =>
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

export const setCurrentUser = (token) => (dispatch) => {
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

export const signup = ({ email, password, username }, callback) => (dispatch) =>
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

export const signin = ({ username, password }, callback) => (dispatch) =>
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
      throw new SubmissionError({
        _error: 'Incorrect Username/Password.',
      });
    });

export const signout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch({
    type: GET_CURRENT_USER,
    payload: {},
  });
  dispatch({
    type: AUTH_USER,
    payload: '',
  });
};

export const forgotPassword = ({ email }, callback) => (dispatch) =>
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
