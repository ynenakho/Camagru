import bcrypt from 'bcrypt';
import mongoose, { Schema, Document, Error } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  isVerified: boolean;
  getNotified: boolean;
  comparePassword: comparePasswordFunction;
}

const userSchema: Schema = new Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true, lowercase: true },
  isVerified: { type: Boolean, default: false },
  getNotified: { type: Boolean, default: true },
});

type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: Error | null, isMatch?: boolean) => void
) => void;

const comparePassword: comparePasswordFunction = function (
  this: IUser,
  candidatePassword,
  callback
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.comparePassword = comparePassword;

module.exports = mongoose.model<IUser>('User', userSchema);
export default mongoose.model<IUser>('User', userSchema);
