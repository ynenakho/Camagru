import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IVerificationToken extends Document {
  _userId: IUser['_id'];
  token: String;
  createdAt: Date;
}

const verificationTokenSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});

module.exports = mongoose.model<IVerificationToken>(
  'VerificationToken',
  verificationTokenSchema
);
export default mongoose.model<IVerificationToken>(
  'VerificationToken',
  verificationTokenSchema
);
