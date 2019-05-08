import {
  MAIN_GET_ALL_PICTURES,
  MAIN_DELETE_PICTURE,
  MAIN_GET_ERRORS,
  MAIN_LIKE_PICTURE
} from '../actions/types';

const INITIAL_STATE = {
  pictures: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAIN_GET_ALL_PICTURES:
      return {
        ...state,
        pictures: action.payload
      };
    case MAIN_LIKE_PICTURE:
      const newState = Object.assign({}, state);
      newState.pictures = newState.pictures.map(picture => {
        if (picture._id === action.payload.pictureId) {
          if (
            picture.likes.filter(
              like => like.user.toString() === action.payload.userId
            ).length > 0
          ) {
            const removeIndex = picture.likes
              .map(item => item.user.toString())
              .indexOf(action.payload.userId);
            picture.likes.splice(removeIndex, 1);
          } else picture.likes.unshift({ user: action.payload.userId });
        }
        return picture;
      });
      return {
        ...newState
      };
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
    default:
      return state;
  }
};
