import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import editPictureReducer from './editPictureReducer';
import mainReducer from './mainReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  edit: editPictureReducer,
  main: mainReducer
});
