import {
  MAIN_GET_ALL_PICTURES,
  MAIN_DELETE_PICTURE_LANDING,
  MAIN_DELETE_PICTURE,
  MAIN_GET_ERRORS,
  MAIN_LIKE_PICTURE,
  MAIN_ADD_COMMENT,
  MAIN_SAVE_PICTURE,
  MAIN_GET_FIVE_PICTURES
} from '../actions/types';

const INITIAL_STATE = {
  picturesFive: [],
  pictures: [],
  error: ''
};

const getNewState = (state, pic) => {
  const newState = Object.assign({}, state);
  if (newState.picturesFive)
    newState.picturesFive = newState.picturesFive.map(picture => {
      if (picture._id === pic._id) {
        picture = Object.assign({}, pic);
      }
      return picture;
    });
  if (newState.pictures)
    newState.pictures = newState.pictures.map(picture => {
      if (picture._id === pic._id) {
        picture = Object.assign({}, pic);
      }
      return picture;
    });
  return newState;
};

export default (state = INITIAL_STATE, action) => {
  let newState;
  // let pictures;
  // let picturesFive;
  switch (action.type) {
    case MAIN_ADD_COMMENT:
      newState = getNewState(state, action.payload);
      return newState;
    case MAIN_GET_ALL_PICTURES:
      return {
        ...state,
        pictures: action.payload
      };
    case MAIN_GET_FIVE_PICTURES:
      return {
        ...state,
        picturesFive: action.payload
      };
    case MAIN_LIKE_PICTURE:
      newState = getNewState(state, action.payload);
      return newState;
    case MAIN_GET_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    case MAIN_DELETE_PICTURE:
      return {
        ...state,
        pictures: state.pictures.filter(
          picture => picture._id !== action.payload
        )
      };
    case MAIN_DELETE_PICTURE_LANDING:
      return {
        ...state,
        picturesFive: state.picturesFive.filter(
          picture => picture._id !== action.payload
        )
      };
    case MAIN_SAVE_PICTURE:
      return {
        ...state,
        pictures: [action.payload, ...state.pictures]
      };
    default:
      return state;
  }
};
