import {
  CHANGE_FRAME,
  CHOOSE_STICKER,
  ADD_COORDS,
  CLEAR_PICTURE,
  SET_CANVAS_DATA,
  CLEAR_COORDS
} from '../actions/types';

const INITIAL_STATE = {
  frame: '',
  sticker: '',
  coords: [],
  canvas: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case SET_CANVAS_DATA:
      return {
        ...state,
        canvas: action.payload
      };
    default:
      return state;
  }
};
