import { Dispatch } from 'redux';
import {
  CHANGE_FRAME,
  CHOOSE_STICKER,
  ADD_COORDS,
  CLEAR_COORDS,
  CLEAR_PICTURE,
  SET_CANVAS_DATA,
  CoordsType,
  StickerType,
} from './types';

export const setCanvasData = (data: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_CANVAS_DATA,
    payload: data,
  });
};

export const changeFrame = (frame: string) => (dispatch: Dispatch) => {
  dispatch({
    type: CHANGE_FRAME,
    payload: frame,
  });
};

export const chooseSticker = (sticker: StickerType) => (dispatch: Dispatch) => {
  dispatch({
    type: CHOOSE_STICKER,
    payload: sticker,
  });
};

export const addStickerCoords = (coords: CoordsType) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: ADD_COORDS,
    payload: coords,
  });
};

export const clearCoords = () => (dispatch: Dispatch) => {
  console.log('IN clearCoords');

  dispatch({
    type: CLEAR_COORDS,
  });
};

export const resetPicture = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_PICTURE,
  });
};
