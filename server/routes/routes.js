const authController = require('../controllers/authController');
const passport = require('passport');
require('../services/passport');

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.get('/api', requireAuth, (req, res) => res.send({ success: true }));
  app.post('/api/signup', authController.signupPost);
  app.post('/api/signin', requireSignin, authController.signinPost);

  app.get('/api/confirmation', authController.confirmationGet);
  app.post('/api/resend', authController.resendTokenPost);
};
