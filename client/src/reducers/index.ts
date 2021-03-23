import { combineReducers } from 'redux';
import authReducer from './authReducer';
import editPictureReducer from './editPictureReducer';
import mainReducer from './mainReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  edit: editPictureReducer,
  main: mainReducer,
});

export type ReduxState = ReturnType<typeof rootReducer>;

export default rootReducer;
