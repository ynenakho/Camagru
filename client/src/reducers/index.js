import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import editPictureReducer from './editPictureReducer';
import mainReducer from './mainReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  edit: editPictureReducer,
  main: mainReducer
});
