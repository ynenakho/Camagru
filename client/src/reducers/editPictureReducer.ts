import {
  CHANGE_FRAME,
  CHOOSE_STICKER,
  ADD_COORDS,
  CLEAR_PICTURE,
  SET_CANVAS_DATA,
  CLEAR_COORDS,
  EditPictureType,
  CoordsType,
  EditPictureActionType,
  StickerType,
} from '../actions/types';

const INITIAL_STATE: EditPictureType = {
  frame: '',
  sticker: { name: '', x: 0, y: 0 } as StickerType,
  coords: [] as CoordsType[],
  canvas: '',
};

export const editReducer = (
  state = INITIAL_STATE,
  action: EditPictureActionType
) => {
  switch (action.type) {
    case CHANGE_FRAME:
      return {
        ...state,
        frame: action.payload,
      };
    case CHOOSE_STICKER:
      return {
        ...state,
        sticker: action.payload,
      };
    case ADD_COORDS:
      return {
        ...state,
        coords: [...state.coords, action.payload],
      };
    case CLEAR_COORDS:
      return {
        ...state,
        coords: [],
      };
    case CLEAR_PICTURE:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case SET_CANVAS_DATA:
      return {
        ...state,
        canvas: action.payload,
      };
    default:
      return state;
  }
};

export default editReducer;
