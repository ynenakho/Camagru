import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';

interface MongoResult {
  _doc: any;
}

export interface IPicture extends Document, MongoResult {
  _userId: IUser['_id'];
  pictureName: string;
  picturePath: string;
  createdAt: Date;
  likes: [
    {
      _userId: IUser['_id'];
    }
  ];
  comments: [
    {
      _id?: string;
      _userId: IUser['_id'];
      userName: string;
      text: string;
    }
  ];
}

const pictureSchema = new Schema(
  {
    _userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    pictureName: { type: String, required: true },
    picturePath: { type: String, required: true },
    likes: [
      {
        _userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    comments: [
      {
        _userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        userName: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IPicture>('Picture', pictureSchema);
