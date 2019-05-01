const authController = require('../controllers/authController');
const passport = require('passport');
require('../services/passport');

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => res.send({ success: true }));
  app.post('/signup', authController.signupPost);
  app.post('/signin', requireSignin, authController.signinPost);

  app.get('/confirmation', authController.confirmationGet);
  app.post('/resend', authController.resendTokenPost);
};
