import {
  AUTH_USER,
  AUTH_ERROR,
  GET_CURRENT_USER,
  USER_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  user: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    case USER_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
