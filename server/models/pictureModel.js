const mongoose = require('mongoose');
const { Schema } = mongoose;

const pictureSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  pictureName: { type: String, required: true },
  picturePath: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  likes: [
    {
      _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  comments: [
    {
      _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      userName: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('Picture', pictureSchema);
