import {
  MAIN_DELETE_PICTURE,
  MAIN_GET_ERRORS,
  MAIN_LIKE_PICTURE,
  MAIN_ADD_COMMENT,
  MAIN_SAVE_PICTURE,
  MAIN_GET_PICTURES,
  MAIN_RESET_PICTURES,
  MainActionsType,
} from './types';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxState } from 'reducers';

export const deleteComment = (pictureId: string, commentId: string) => (
  dispatch: ThunkDispatch<ReduxState, void, MainActionsType>
) => {
  axios
    .delete(`/api/picture/comment/delete/${pictureId}/${commentId}`)
    .then((response) =>
      dispatch({
        type: MAIN_ADD_COMMENT,
        payload: response.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: MAIN_GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addComment = (
  pictureId: string,
  commentData: { text: string }
) => (dispatch: ThunkDispatch<ReduxState, void, MainActionsType>) => {
  axios
    .post(`/api/picture/comment/${pictureId}`, commentData)
    .then((response) =>
      dispatch({
        type: MAIN_ADD_COMMENT,
        payload: response.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: MAIN_GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getPictures = (page: number, length: number = 5) => (
  dispatch: ThunkDispatch<ReduxState, void, MainActionsType>
) => {
  axios
    .get('/api/pictures', { params: { page, length } })
    .then((response) => {
      dispatch({
        type: MAIN_GET_PICTURES,
        payload: response.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: MAIN_GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getOwnPictures = (page: number, length: number = 12) => (
  dispatch: ThunkDispatch<ReduxState, void, MainActionsType>
) => {
  axios
    .get('/api/pictures/own', { params: { page, length } })
    .then((response) => {
      dispatch({
        type: MAIN_GET_PICTURES,
        payload: response.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: MAIN_GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const likePicture = (pictureId: string) => (
  dispatch: ThunkDispatch<ReduxState, void, MainActionsType>
) => {
  axios
    .post(`/api/picture/like/${pictureId}`)
    .then((response) => {
      dispatch({
        type: MAIN_LIKE_PICTURE,
        payload: response.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: MAIN_GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deletePicture = (pictureId: string) => (
  dispatch: ThunkDispatch<ReduxState, void, MainActionsType>
) => {
  axios
    .delete(`/api/picture/delete/${pictureId}`)
    .then((response) =>
      dispatch({
        type: MAIN_DELETE_PICTURE,
        payload: response.data.pictureId,
      })
    )
    .catch((err) =>
      dispatch({
        type: MAIN_GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const savePictureToServer = (picturePath: string) => (
  dispatch: ThunkDispatch<ReduxState, void, MainActionsType>
) => {
  axios
    .post('/api/picture/upload', { picturePath })
    .then((response) => {
      dispatch({
        type: MAIN_SAVE_PICTURE,
        payload: response.data.picture,
      });
    })
    .catch((err) =>
      dispatch({
        type: MAIN_GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const resetPictures = () => (
  dispatch: ThunkDispatch<ReduxState, void, MainActionsType>
) => {
  dispatch({
    type: MAIN_RESET_PICTURES,
  });
};
