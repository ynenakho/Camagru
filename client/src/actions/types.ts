export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const USER_ERROR = 'USER_ERROR';

export const CHANGE_FRAME = 'CHANGE_FRAME';
export const CHOOSE_STICKER = 'CHOOSE_STICKER';
export const ADD_COORDS = 'ADD_COORDS';
export const CLEAR_PICTURE = 'CLEAR_PICTURE';
export const SET_CANVAS_DATA = 'SET_CANVAS_DATA';
export const CLEAR_COORDS = 'CLEAR_COORDS';

export const MAIN_GET_ALL_PICTURES = 'MAIN_GET_ALL_PICTURES';
export const MAIN_DELETE_PICTURE = 'MAIN_DELETE_PICTURE';
export const MAIN_GET_ERRORS = 'MAIN_GET_ERRORS';
export const MAIN_LIKE_PICTURE = 'MAIN_LIKE_PICTURE';
export const MAIN_ADD_COMMENT = 'MAIN_ADD_COMMENT';
export const MAIN_SAVE_PICTURE = 'MAIN_SAVE_PICTURE';
export const MAIN_GET_FIVE_PICTURES = 'MAIN_GET_FIVE_PICTURES';
export const MAIN_DELETE_PICTURE_LANDING = 'MAIN_DELETE_PICTURE_LANDING';

// AuthReducer Types
type AuthUserAction = {
  type: typeof AUTH_USER;
  payload: string;
};

type AuthErrorAction = {
  type: typeof AUTH_ERROR;
  payload: string;
};

type GetCurrentUserAction = {
  type: typeof GET_CURRENT_USER;
  payload: UserType;
};

type UserErrorAction = {
  type: typeof USER_ERROR;
  payload: string;
};

export type UserType = {
  id: string;
  username: string;
  email: string;
  getNotified: boolean;
};

export type AuthActionType =
  | AuthUserAction
  | AuthErrorAction
  | GetCurrentUserAction
  | UserErrorAction;

export type AuthReducerType = {
  authenticated: string;
  errorMessage: string;
  user: UserType;
};

// EditPictureReducer Types
type ChangeFrameAction = {
  type: typeof CHANGE_FRAME;
  payload: string;
};

export type StickerType = {
  name: string;
  x: number;
  y: number;
};

type ChooseStickerAction = {
  type: typeof CHOOSE_STICKER;
  payload: StickerType;
};

export type CoordsType = {
  name: string;
  x: number;
  y: number;
  oldWidth: number;
  oldHeight: number;
};

type AddCoordsAction = {
  type: typeof ADD_COORDS;
  payload: CoordsType;
};

type SetCanvasDataAction = {
  type: typeof SET_CANVAS_DATA;
  payload: string;
};

type ClearPictureAction = {
  type: typeof CLEAR_PICTURE;
};

type ClearCoordsAction = {
  type: typeof CLEAR_COORDS;
};

export type EditPictureActionType =
  | ChangeFrameAction
  | ChooseStickerAction
  | AddCoordsAction
  | SetCanvasDataAction
  | ClearPictureAction
  | ClearCoordsAction;

export type EditPictureType = {
  frame: string;
  sticker: { name: string; x: number; y: number };
  coords: CoordsType[];
  canvas: string;
};

// MainReducer Types
export type LikeType = {
  _id: string;
  _userId: string;
};

export type CommentType = {
  _id: string;
  _userId: string;
  text: string;
  userName: string;
  createdAt: string;
};

export type PictureType = {
  _id: string;
  picturePath: string;
  _userId: string;
  pictureName: string;
  createdAt: string;
  likes: LikeType[];
  comments: CommentType[];
  userName: string;
};

type GetAllPicturesAction = {
  type: typeof MAIN_GET_ALL_PICTURES;
  payload: PictureType[];
};

type DeletePictureLandingAction = {
  type: typeof MAIN_DELETE_PICTURE_LANDING;
  payload: string;
};

type DeletePictureAction = {
  type: typeof MAIN_DELETE_PICTURE;
  payload: string;
};

type GetErrorsAction = {
  type: typeof MAIN_GET_ERRORS;
  payload: string;
};

type LikePictureAction = {
  type: typeof MAIN_LIKE_PICTURE;
  payload: PictureType;
};

type AddCommentAction = {
  type: typeof MAIN_ADD_COMMENT;
  payload: PictureType;
};

type SavePictureAction = {
  type: typeof MAIN_SAVE_PICTURE;
  payload: PictureType;
};

type GetFivePicturesAction = {
  type: typeof MAIN_GET_FIVE_PICTURES;
  payload: { pictures: PictureType[]; pages: number };
};

export type MainActionsType =
  | GetAllPicturesAction
  | DeletePictureLandingAction
  | DeletePictureAction
  | GetErrorsAction
  | LikePictureAction
  | AddCommentAction
  | SavePictureAction
  | GetFivePicturesAction;

export type MainReducerType = {
  picturesMain: PictureType[];
  pagesMain: number;
  pictures: PictureType[];
  error: string;
};
