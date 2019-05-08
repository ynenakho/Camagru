const authController = require('../controllers/authController');
const pictureController = require('../controllers/pictureController');
const mainController = require('../controllers/mainController');
const passport = require('passport');
require('../services/passport');

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
  // Auth routes
  app.get('/api/current', requireAuth, authController.currentGet);
  app.get('/api', requireAuth, (req, res) => res.send({ success: true }));
  app.post('/api/forgotpassword', authController.forgotPasswordPost);
  app.post('/api/updateprofile', requireAuth, authController.updateProfilePost);
  app.post('/api/signup', authController.signupPost);
  app.post('/api/signin', requireSignin, authController.signinPost);
  app.get('/api/confirmation', authController.confirmationGet);
  app.post('/api/resend', authController.resendTokenPost);

  // Picture routes
  app.get('/api/picture/mine', requireAuth, pictureController.picturesMyGet);
  app.post('/api/picture/save', requireAuth, pictureController.savePicturePost);
  app.delete(
    '/api/picture/delete/:id',
    requireAuth,
    pictureController.pictureDelete
  );
  app.post(
    '/api/picture/like/:id',
    requireAuth,
    pictureController.pictureLikePost
  );
  // Main routes
  app.get('/api/main/all', mainController.picturesAllGet);
};
