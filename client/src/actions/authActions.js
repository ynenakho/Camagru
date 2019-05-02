import { AUTH_USER, AUTH_ERROR } from './types';
import { SubmissionError } from 'redux-form';
import axios from 'axios';

export const signup = ({ email, password, username }, callback) => dispatch =>
  axios
    .post('/api/signup', {
      email,
      password,
      username
    })
    .then(response => {
      dispatch({
        type: AUTH_USER,
        payload: response.data.token
      });
      localStorage.setItem('token', response.data.token);
      callback();
    })
    .catch(e => {
      dispatch({
        type: AUTH_ERROR,
        payload: e.response.data.error
      });
      throw new SubmissionError({
        _error: e.response.data.error
      });
    });

export const signin = ({ username, password }, callback) => dispatch =>
  axios
    .post('/api/signin', {
      username,
      password
    })
    .then(response => {
      dispatch({
        type: AUTH_USER,
        payload: response.data.token
      });
      localStorage.setItem('token', response.data.token);
      callback();
    })
    .catch(e => {
      dispatch({
        type: AUTH_ERROR,
        payload: e.response.data.error
      });
      throw new SubmissionError({
        _error: 'Incorrect Username/Password.'
      });
    });

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
