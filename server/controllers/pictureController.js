const User = require('../models/userModel');
const Picture = require('../models/pictureModel');
const fs = require('fs');
const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');

exports.picturesAllGet = (req, res, next) => {
  Picture.find({})
    .sort([['createdAt', -1]])
    .exec((err, pictures) => {
      if (err) return next(err);
      res.json({ pictures });
    });
};

exports.picturesFiveGet = (req, res, next) => {
  Picture.find({})
    .limit(5)
    .skip(5 * req.query.page)
    .sort([['createdAt', -1]])
    .exec((err, pictures) => {
      if (err) return next(err);
      res.json({ pictures });
    });
};

exports.commentDelete = (req, res, next) => {
  Picture.findById(req.params.id)
    .then(picture => {
      // Check to see if th comment exists
      if (
        picture.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentNotExists: 'Comment does not exists' });
      }

      // Get remove index
      const removeIndex = picture.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice it out of array
      picture.comments.splice(removeIndex, 1);
      picture.save().then(picture => res.json(picture));
    })
    .catch(err =>
      res.status(404).json({ pictureNotFound: 'picture not found' })
    );
};

exports.addCommentPost = (req, res, next) => {
  Picture.findById(req.params.id)
    .then(picture => {
      const newComment = {
        text: req.body.text,
        _userId: req.user.id,
        userName: req.user.username
      };

      // Add to comments array
      picture.comments.push(newComment);

      // Save
      picture.save().then(picture => {
        User.findById(picture._userId)
          .then(user => {
            if (user.getNotified) {
              sgMail.setApiKey(keys.sendGridKey);
              const mailOptions = {
                from: 'no-reply@camagru.com',
                to: user.email,
                subject: 'New comment!',
                text: `Hello, ${user.username}\n
  You have new comment on your picture!
  User: ${newComment.userName}
  Comment: ${newComment.text}`
              };
              sgMail.send(mailOptions, err => {
                if (err) return next(err);
                // res.send({
                //   message: `An email about new comment has been sent to ${
                //     user.email
                //   }.`
                // });
              });
            }
          })
          .catch(err =>
            res.status(404).json({ userNotFound: 'User not found' })
          );
        res.json(picture);
      });
    })
    .catch(err =>
      res.status(404).json({ pictureNotFound: 'Picture not found' })
    );
};

exports.pictureLikePost = (req, res, next) => {
  Picture.findById(req.params.id)
    .then(picture => {
      if (
        picture.likes.filter(like => like._userId.toString() === req.user.id)
          .length > 0
      ) {
        // Get remove index
        const removeIndex = picture.likes
          .map(item => item._userId.toString())
          .indexOf(req.user.id);
        // Splice out of array
        picture.likes.splice(removeIndex, 1);
      } else {
        picture.likes.unshift({ _userId: req.user.id });
      }
      picture.save().then(() => res.json(picture));
    })
    .catch(err => res.status(404).json({ error: 'Picture not found' }));
};

exports.pictureDelete = (req, res, next) => {
  Picture.findById(req.params.id)
    .then(picture => {
      // Check for picture owner
      if (picture._userId.toString() !== req.user.id) {
        return res.status(401).json({ error: 'User not authorized' });
      }

      fs.unlink(picture.picturePath, err => {
        if (err) console.log(err);
        console.log(picture.picturePath, 'was deleted');
      });

      picture
        .remove()
        .then(picture => res.json({ pictureId: picture._id }))
        .catch(err => res.status(404).json({ error: err }));
    })
    .catch(err => res.status(404).json({ error: 'Picture not found' }));
};

exports.savePicturePost = (req, res, next) => {
  const { picturePath } = req.body;
  const { _id, username } = req.user;

  const base64Data = picturePath.replace(/^data:image\/png;base64,/, '');
  const filePath = `uploads/${username}-${new Date().getTime()}.png`;
  fs.writeFile(filePath, base64Data, 'base64', function(err) {
    if (err) {
      console.log(err);
    }
  });

  const newPicture = new Picture({
    picturePath: filePath,
    _userId: _id
  });

  newPicture.save(err => {
    if (err) return next(err);
  });

  res.json({ picture: newPicture });
};
