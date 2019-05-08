const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true, lowercase: true },
  isVerified: { type: Boolean, default: false },
  getNotified: { type: Boolean, default: true }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
