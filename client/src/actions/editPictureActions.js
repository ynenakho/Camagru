import {
  CHANGE_FRAME,
  CHOOSE_STICKER,
  ADD_COORDS,
  // CLEAR_COORDS,
  CLEAR_PICTURE,
  GET_MY_PICTURES,
  SAVE_PICTURE,
  SET_CANVAS_DATA,
  DELETE_PICTURE,
  GET_ERRORS
} from './types';
import axios from 'axios';

// export const likePicture = (pictureId, userId) => async dispatch => {
//   await axios
//     .post(`/api/picture/like/${pictureId}`)
//     .then(response => {
//       dispatch({
//         type: LIKE_PICTURE,
//         payload: { pictureId, userId }
//       });
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data.error
//       })
//     );
// };

export const deletePicture = pictureId => dispatch => {
  axios
    .delete(`/api/picture/delete/${pictureId}`)
    .then(response =>
      dispatch({
        type: DELETE_PICTURE,
        payload: pictureId
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error
      })
    );
};

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
export const resetPictur = () => dispatch => {
  dispatch({
    type: CLEAR_PICTURE
  });
};

export const getAllPictures = () => dispatch => {
  axios
    .get('/api/picture/mine')
    .then(response => {
      dispatch({
        type: GET_MY_PICTURES,
        payload: response.data.pictures
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error
      })
    );
};

export const savePictureToServer = picturename => dispatch => {
  axios
    .post('/api/picture/save', { picturename })
    .then(response => {
      dispatch({
        type: SAVE_PICTURE,
        payload: response.data.picture
      });
      dispatch({
        type: CLEAR_PICTURE
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error
      })
    );
};
