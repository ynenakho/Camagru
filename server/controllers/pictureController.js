const User = require('../models/userModel');
const Picture = require('../models/pictureModel');
const fs = require('fs');
const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');

const addUsernamesToPictures = (pictures) => {
  return new Promise((resolve, reject) => {
    const userIds = pictures.map((picture) => picture._userId);
    User.find({ _id: { $in: userIds } }).then((users) => {
      const hashT = {};
      users.map((user) => {
        hashT[user._id] = user.username;
      });
      const newPictures = pictures.map((picture) => {
        return { ...picture._doc, userName: hashT[picture._userId] };
      });
      resolve(newPictures);
    });
  });
};

const getUserNameForPicture = async (picture) => {
  const user = await User.findById(picture._userId);
  return {
    ...picture._doc,
    userName: user.username,
  };
};

exports.picturesAllGet = (req, res, next) => {
  Picture.find({ _userId: req.user.id })
    .sort([['createdAt', -1]])
    .exec(async (err, pictures) => {
      if (err) return next(err);
      const newPictures = await addUsernamesToPictures(pictures);
      res.json({ pictures: newPictures });
    });
};

exports.picturesFiveGet = (req, res, next) => {
  Picture.find({})
    .limit(5)
    .skip(5 * req.query.page)
    .sort([['createdAt', -1]])
    .exec(async (err, pictures) => {
      if (err) return next(err);
      const newPictures = await addUsernamesToPictures(pictures);
      res.json({ pictures: newPictures });
    });
};

exports.commentDelete = (req, res) => {
  Picture.findById(req.params.id)
    .then((picture) => {
      // Check to see if th comment exists
      if (
        picture.comments.filter(
          (comment) => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res.status(404).json({ error: 'Comment does not exists' });
      }

      // Get remove index
      const removeIndex = picture.comments
        .map((item) => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice it out of array
      picture.comments.splice(removeIndex, 1);
      picture.save().then(async (picture) => {
        const pictureWithUserName = await getUserNameForPicture(picture);
        res.json(pictureWithUserName);
      });
    })
    .catch((err) => res.status(404).json({ error: 'Picture not found' }));
};

exports.addCommentPost = (req, res, next) => {
  Picture.findById(req.params.id)
    .then((picture) => {
      const newComment = {
        text: req.body.text,
        _userId: req.user.id,
        userName: req.user.username,
      };

      // Add to comments array
      picture.comments.push(newComment);

      // Save
      picture.save().then(async (picture) => {
        User.findById(picture._userId)
          .then((user) => {
            if (user.getNotified) {
              sgMail.setApiKey(keys.sendGridKey);
              const mailOptions = {
                from: 'no-reply@camagru.com',
                to: user.email,
                subject: 'New comment!',
                text: `Hello, ${user.username}\n
  You have new comment on your picture!
  User: ${newComment.userName}
  Comment: ${newComment.text}`,
              };
              sgMail.send(mailOptions, (err) => {
                if (err) return next(err);
              });
            }
          })
          .catch((err) => res.status(404).json({ error: 'User not found' }));
        const pictureWithUserName = await getUserNameForPicture(picture);
        res.json(pictureWithUserName);
      });
    })
    .catch((err) => res.status(404).json({ error: 'Picture not found' }));
};

exports.pictureLikePost = (req, res) => {
  Picture.findById(req.params.id)
    .then((picture) => {
      if (
        picture.likes.filter((like) => like._userId.toString() === req.user.id)
          .length > 0
      ) {
        // Get remove index
        const removeIndex = picture.likes
          .map((item) => item._userId.toString())
          .indexOf(req.user.id);
        // Splice out of array
        picture.likes.splice(removeIndex, 1);
      } else {
        picture.likes.unshift({ _userId: req.user.id });
      }
      picture.save().then(async () => {
        const pictureWithUserName = await getUserNameForPicture(picture);
        res.json(pictureWithUserName);
      });
    })
    .catch((err) => res.status(404).json({ error: 'Picture not found' }));
};
