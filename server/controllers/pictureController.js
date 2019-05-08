const User = require('../models/userModel');
const Picture = require('../models/pictureModel');

exports.picturesMyGet = (req, res, next) => {
  Picture.find({ _userId: req.user.id })
    .sort([['createdAt', -1]])
    .exec((err, pictures) => {
      if (err) return next(err);
      res.json({ pictures });
    });
};

exports.pictureLikePost = (req, res, next) => {
  Picture.findById(req.params.id)
    .then(picture => {
      if (
        picture.likes.filter(like => like.user.toString() === req.user.id)
          .length > 0
      ) {
        // Get remove index
        const removeIndex = picture.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        // Splice out of array
        picture.likes.splice(removeIndex, 1);
      } else {
        picture.likes.unshift({ user: req.user.id });
      }
      picture.save().then(() => res.json({ pictureliked: true }));
    })
    .catch(err =>
      res.status(404).json({ picturenotfound: 'No picture found' })
    );
};

exports.pictureDelete = (req, res, next) => {
  Picture.findById(req.params.id)
    .then(picture => {
      // Check for picture owner
      if (picture._userId.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' });
      }
      picture.remove().then(() => res.json({ picturedeleted: true }));
    })
    .catch(err =>
      res.status(404).json({ picturenotfound: 'No picture found' })
    );
};

exports.savePicturePost = (req, res, next) => {
  const { picturename } = req.body;
  const { _id } = req.user;

  const newPicture = new Picture({
    picturename,
    _userId: _id
  });

  newPicture.save(err => {
    if (err) return next(err);
  });
  res.json({ success: true, picture: newPicture });
};
