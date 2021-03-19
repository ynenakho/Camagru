import {
  MAIN_GET_ALL_PICTURES,
  MAIN_DELETE_PICTURE_LANDING,
  MAIN_DELETE_PICTURE,
  MAIN_GET_ERRORS,
  MAIN_LIKE_PICTURE,
  MAIN_ADD_COMMENT,
  MAIN_SAVE_PICTURE,
  MAIN_GET_FIVE_PICTURES,
  MainReducerType,
  PictureType,
  MainActionsType,
} from '../actions/types';

const INITIAL_STATE: MainReducerType = {
  picturesMain: [] as PictureType[],
  pagesMain: 0,
  pictures: [] as PictureType[],
  error: '',
};

const getNewState = (state: MainReducerType, pic: PictureType) => {
  const newState = Object.assign({}, state);
  if (newState.picturesMain)
    newState.picturesMain = newState.picturesMain.map((picture) => {
      if (picture._id === pic._id) {
        picture = Object.assign({}, pic);
      }
      return picture;
    });
  if (newState.pictures)
    newState.pictures = newState.pictures.map((picture) => {
      if (picture._id === pic._id) {
        picture = Object.assign({}, pic);
      }
      return picture;
    });
  return newState;
};

export const mainReducer = (state = INITIAL_STATE, action: MainActionsType) => {
  let newState;
  switch (action.type) {
    case MAIN_ADD_COMMENT:
      newState = getNewState(state, action.payload);
      return newState;
    case MAIN_GET_ALL_PICTURES:
      return {
        ...state,
        pictures: action.payload,
      };
    case MAIN_GET_FIVE_PICTURES:
      return {
        ...state,
        picturesMain: [...state.picturesMain, ...action.payload.pictures],
        pagesMain: action.payload.pages,
      };
    case MAIN_LIKE_PICTURE:
      newState = getNewState(state, action.payload);
      return newState;
    case MAIN_GET_ERRORS:
      return {
        ...state,
        error: action.payload,
      };
    case MAIN_DELETE_PICTURE:
      return {
        ...state,
        pictures: state.pictures.filter(
          (picture) => picture._id !== action.payload
        ),
      };
    case MAIN_DELETE_PICTURE_LANDING:
      return {
        ...state,
        picturesMain: state.picturesMain.filter(
          (picture) => picture._id !== action.payload
        ),
      };
    case MAIN_SAVE_PICTURE:
      return {
        ...state,
        pictures: [action.payload, ...state.pictures],
      };
    default:
      return state;
  }
};

export default mainReducer;
