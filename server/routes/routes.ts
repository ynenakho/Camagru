import * as authController from '../controllers/auth.controller';
const awsController = require('../controllers/aws.controller');
const pictureController = require('../controllers/picture.controller');
import passport from 'passport';
import { usePassport } from '../services/passport';
import { Express } from 'express';

usePassport();

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

const routes = (app: Express) => {
  // AWS s3 routes
  app.post('/api/picture/upload', requireAuth, awsController.uploadPicturePost);
  app.delete(
    '/api/picture/delete/:id',
    requireAuth,
    awsController.pictureDelete
  );

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
  app.post(
    '/api/picture/like/:id',
    requireAuth,
    pictureController.pictureLikePost
  );
  app.post(
    '/api/picture/comment/:id',
    requireAuth,
    pictureController.addCommentPost
  );
  app.delete(
    '/api/picture/comment/delete/:id/:comment_id',
    requireAuth,
    pictureController.commentDelete
  );
  app.get('/api/picture/all', requireAuth, pictureController.picturesAllGet);
  app.get('/api/picture/five', pictureController.picturesFiveGet);
};

export default routes;
