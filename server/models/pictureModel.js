const mongoose = require('mongoose');
const { Schema } = mongoose;

const pictureSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  picturename: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
