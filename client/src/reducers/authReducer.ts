import {
  AUTH_USER,
  AUTH_ERROR,
  GET_CURRENT_USER,
  USER_ERROR,
  AuthReducerType,
  UserType,
  AuthActionType,
} from '../actions/types';

const INITIAL_STATE: AuthReducerType = {
  authenticated: '',
  errorMessage: '',
  user: {} as UserType,
};

export default (state = INITIAL_STATE, action: AuthActionType) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
