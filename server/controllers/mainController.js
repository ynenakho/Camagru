const User = require('../models/userModel');
const Picture = require('../models/pictureModel');

exports.picturesAllGet = (req, res, next) => {
  Picture.find({})
    .sort([['createdAt', -1]])
    .exec((err, pictures) => {
      if (err) return next(err);
      res.json({ pictures });
    });
};
