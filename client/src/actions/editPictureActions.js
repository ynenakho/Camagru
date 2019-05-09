import {
  CHANGE_FRAME,
  CHOOSE_STICKER,
  ADD_COORDS,
  CLEAR_COORDS,
  CLEAR_PICTURE,
  SET_CANVAS_DATA
} from './types';

export const setCanvasData = data => dispatch => {
  dispatch({
    type: SET_CANVAS_DATA,
    payload: data
  });
};

export const changeFrame = frame => dispatch => {
  dispatch({
    type: CHANGE_FRAME,
    payload: frame
  });
};

export const chooseSticker = sticker => dispatch => {
  dispatch({
    type: CHOOSE_STICKER,
    payload: sticker
  });
};

export const addStickerCoords = coords => dispatch => {
  dispatch({
    type: ADD_COORDS,
    payload: coords
  });
};

export const clearCoords = () => dispatch => {
  dispatch({
    type: CLEAR_COORDS
  });
};

export const resetPicture = () => dispatch => {
  dispatch({
    type: CLEAR_PICTURE
  });
};
