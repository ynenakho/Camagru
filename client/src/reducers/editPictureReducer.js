import {
  CHANGE_FRAME,
  CHOOSE_STICKER,
  ADD_COORDS,
  CLEAR_PICTURE,
  // GET_MY_PICTURES,
  // SAVE_PICTURE,
  SET_CANVAS_DATA,
  // DELETE_PICTURE,
  GET_ERRORS,
  CLEAR_COORDS
  // LIKE_PICTURE
} from '../actions/types';

const INITIAL_STATE = {
  frame: '',
  sticker: '',
  coords: [],
  // pictures: [],
  canvas: '',
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case LIKE_PICTURE:
    //   const newState = Object.assign({}, state);
    //   newState.pictures = newState.pictures.map(picture => {
    //     if (picture._id === action.payload.pictureId) {
    //       if (
    //         picture.likes.filter(
    //           like => like.user.toString() === action.payload.userId
    //         ).length > 0
    //       ) {
    //         const removeIndex = picture.likes
    //           .map(item => item.user.toString())
    //           .indexOf(action.payload.userId);
    //         picture.likes.splice(removeIndex, 1);
    //       } else picture.likes.unshift({ user: action.payload.userId });
    //     }
    //     return picture;
    //   });
    // return {
    //   ...newState
    // };
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    // case DELETE_PICTURE:
    //   return {
    //     ...state,
    //     pictures: state.pictures.filter(
    //       picture => picture._id !== action.payload
    //     )
    //   };
    case CHANGE_FRAME:
      return {
        ...state,
        frame: action.payload
      };
    case CHOOSE_STICKER:
      return {
        ...state,
        sticker: action.payload
      };
    case ADD_COORDS:
      return {
        ...state,
        coords: [...state.coords, action.payload]
      };
    case CLEAR_COORDS:
      return {
        ...state,
        coords: []
      };
    case CLEAR_PICTURE:
      return {
        ...state,
        frame: '',
        sticker: '',
        coords: [],
        canvas: ''
      };
    // case GET_MY_PICTURES:
    //   return {
    //     ...state,
    //     pictures: action.payload
    //   };
    // case SAVE_PICTURE:
    //   return {
    //     ...state,
    //     pictures: [action.payload, ...state.pictures]
    //   };
    case SET_CANVAS_DATA:
      return {
        ...state,
        canvas: action.payload
      };
    default:
      return state;
  }
};
