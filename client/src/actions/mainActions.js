import {
  MAIN_GET_ALL_PICTURES,
  MAIN_DELETE_PICTURE,
  MAIN_GET_ERRORS,
  MAIN_LIKE_PICTURE
} from './types';
import axios from 'axios';

export const getAllPictures = () => dispatch => {
  axios
    .get('/api/main/all')
    .then(response => {
      dispatch({
        type: MAIN_GET_ALL_PICTURES,
        payload: response.data.pictures
      });
    })
    .catch(err =>
      dispatch({
        type: MAIN_GET_ERRORS,
        payload: err.response.data.error
      })
    );
};

export const likePicture = (pictureId, userId) => async dispatch => {
  await axios
    .post(`/api/picture/like/${pictureId}`)
    .then(response => {
      dispatch({
        type: MAIN_LIKE_PICTURE,
        payload: { pictureId, userId }
      });
    })
    .catch(err =>
      dispatch({
        type: MAIN_GET_ERRORS,
        payload: err.response.data.error
      })
    );
};

export const deletePicture = pictureId => dispatch => {
  axios
    .delete(`/api/picture/delete/${pictureId}`)
    .then(response =>
      dispatch({
        type: MAIN_DELETE_PICTURE,
        payload: pictureId
      })
    )
    .catch(err =>
      dispatch({
        type: MAIN_GET_ERRORS,
        payload: err.response.data.error
      })
    );
};
