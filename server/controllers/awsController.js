const Picture = require('../models/pictureModel');
const keys = require('../config/keys');
const AWS = require('aws-sdk');

exports.uploadPicturePost = (req, res, next) => {
  const { picturePath } = req.body;
  const { _id, username } = req.user;

  const base64String = picturePath.replace(/^data:image\/png;base64,/, '');
  const base64Data = new Buffer.from(base64String, 'base64');
  const fileName = `${username}-${new Date().getTime()}.png`;
  const s3FileURL = keys.AWSFileURL;

  const s3bucket = new AWS.S3({
    accessKeyId: keys.AWSAccessKey,
    secretAccessKey: keys.AWSSecretAccessKey,
    region: keys.AWSRegion
  });

  const params = {
    Bucket: keys.S3Bucket,
    Key: fileName,
    Body: base64Data,
    ContentType: 'image/jpeg',
    ACL: 'public-read',
    ContentEncoding: 'base64'
  };

  s3bucket.upload(params, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    const newPicture = new Picture({
      picturePath: s3FileURL + fileName,
      _userId: _id,
      pictureName: fileName
    });

    newPicture.save(err => {
      if (err) return next(err);
    });

    res.json({ picture: newPicture });
  });
};

exports.pictureDelete = (req, res, next) => {
  Picture.findById(req.params.id)
    .then(picture => {
      // Check for picture owner
      if (picture._userId.toString() !== req.user.id) {
        return res.status(401).json({ error: 'User not authorized' });
      }

      const s3bucket = new AWS.S3({
        accessKeyId: keys.AWSAccessKey,
        secretAccessKey: keys.AWSSecretAccessKey,
        region: keys.AWSRegion
      });

      const params = {
        Bucket: keys.S3Bucket,
        Key: picture.pictureName
      };

      console.log('PARAMS=', params);

      s3bucket.deleteObject(params, (err, data) => {
        if (err) return res.status(500).json({ error: err });
      });

      picture
        .remove()
        .then(picture => res.json({ pictureId: picture._id }))
        .catch(err => res.status(404).json({ error: err }));
    })
    .catch(err => res.status(404).json({ error: 'Picture not found' }));
};
