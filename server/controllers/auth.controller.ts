import User, { IUser } from '../models/user.model';
import VerificationToken, {
  IVerificationToken,
} from '../models/verificationToken.model';
// const VerificationToken = require('../models/verificationToken.model');
import keys from '../config/keys';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { generatePassword } from '../helpers/generatePassword';
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../controllers/picture.controller';

const tokenForUser = (user: IUser) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.jwtTokenSecret);
};

exports.currentGet = (req: AuthenticatedRequest, res: Response) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    getNotified: req.user.getNotified,
  });
};

exports.forgotPasswordPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  User.findOne({ email })
    .then((existingUser) => {
      // if (err) return next(err);
      if (!existingUser)
        return res.status(400).json({ error: 'Email not registered' });
      const newPassword = generatePassword(6);
      existingUser.password = bcrypt.hashSync(newPassword, 10);
      existingUser.save((err) => {
        if (err) return next(err);

        // Send the email
        sgMail.setApiKey(keys.sendGridKey);
        const mailOptions = {
          from: 'no-reply@camagru.com',
          to: email,
          subject: 'Account Verification Token',
          text: `Hello, ${existingUser.username}
        Your new password is ${newPassword}`,
        };
        sgMail.send(mailOptions, undefined, (err) => {
          if (err) return next(err);
          res.send({
            message: `New Password has been sent to ${email}.`,
          });
        });
      });
    })
    .catch(() => res.status(400).json({ error: 'Email not registered' }));
};

exports.updateProfilePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.body.username;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const email = req.body.email;
  const getNotified = req.body.getNotified;
  const id = req.body.id;

  User.findById(id)
    .then((existingUser) => {
      // if (err) return next(err);
      if (!existingUser)
        return res.status(400).json({ error: 'Email not registered' });
      existingUser.comparePassword(oldPassword, (err, isMatch) => {
        if (err) return next(err);
        if (!isMatch)
          return res.status(400).json({
            error:
              'Password does not match the password that you have on your profile',
          });
        if (existingUser.username !== username) {
          User.findOne({ username })
            .then((foundUser) => {
              // if (err) return next(err);
              if (foundUser)
                return res
                  .status(400)
                  .json({ error: 'Username already taken' });
            })
            .catch(() =>
              res.status(400).json({ error: 'Username already taken' })
            );
        }
        if (existingUser.email !== email) {
          User.findOne({ email })
            .then((foundUser) => {
              // if (err) return next(err);
              if (foundUser)
                return res.status(400).json({ error: 'Email already taken' });
            })
            .catch(() =>
              res.status(400).json({ error: 'Email already taken' })
            );
        }
        if (newPassword) {
          existingUser.password = bcrypt.hashSync(newPassword, 10);
        }
        existingUser.username = username;
        existingUser.email = email;
        existingUser.getNotified = getNotified;
        existingUser.save((err) => {
          if (err) return next(err);
          return res.json({ token: tokenForUser(existingUser) });
        });
      });
    })
    .catch(() => res.status(400).json({ error: 'User not registered' }));
};

exports.signinPost = (req: AuthenticatedRequest, res: Response) => {
  res.json({ token: tokenForUser(req.user) });
};

exports.signupPost = (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  User.findOne({ username: username })
    .then((existingUser) => {
      if (existingUser)
        return res
          .status(400)
          .json({ error: 'Email/User is already registered' });

      const hash = bcrypt.hashSync(password, 10);
      const user = new User({
        username,
        password: hash,
        email,
      });

      user.save((err: any) => {
        if (err) {
          if (err.name === 'MongoError' && err.code === 11000) {
            // Duplicate username
            return res
              .status(400)
              .send({ error: 'Email/User is already registered' });
          }
          return next(err);
        }

        const verificationToken = new VerificationToken({
          _userId: user._id,
          token: crypto.randomBytes(16).toString('hex'),
        });

        verificationToken.save((err) => {
          if (err) return next(err);

          // Send the email
          sgMail.setApiKey(keys.sendGridKey);
          const mailOptions = {
            from: 'no-reply@camagru.com',
            to: email,
            subject: 'Account Verification Token',
            text: `Hello, ${username}\n
          Please verify your account by clicking the link:
          https://${req.headers.host}/api/confirmation?token=${verificationToken.token}&email=${email}`,
          };
          sgMail.send(mailOptions, undefined, (err) => {
            if (err) return next(err);
            res.send({
              message: `A verification email has been sent to ${email}.`,
            });
          });
        });
      });
    })
    .catch((err) => res.status(400).send({ error: err }));
};

exports.confirmationGet = (req: Request, res: Response, next: NextFunction) => {
  const token = req.query.token as string;
  const email = req.query.email as string;

  VerificationToken.findOne({ token: token })
    .then((existingToken) => {
      if (!existingToken)
        return res.status(400).send({
          error: 'We were unable to verify you. Token might be expired.',
        });

      User.findOne({ _id: existingToken._userId, email: email })
        .then((existingUser) => {
          if (!existingUser)
            return res.status(400).send({
              error: 'We were unable to find a user for this token.',
            });
          if (existingUser.isVerified)
            return res
              .status(400)
              .send({ error: 'This user has already been verified.' });

          existingUser.isVerified = true;
          existingUser.save((err) => {
            if (err) return next(err);
            res.status(301).redirect(keys.clientURI + '/signin');
          });
        })
        .catch((err) => res.status(400).send({ error: err }));
    })
    .catch((err) => res.status(400).send({ error: err }));
};

exports.resendTokenPost = (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;

  User.findOne({ email: email })
    .then((existingUser) => {
      if (!existingUser)
        return res
          .status(400)
          .send({ error: 'We were unable to find a user with that email.' });
      if (existingUser.isVerified)
        return res.status(400).send({
          error: 'This account has already been verified. Please log in.',
        });

      // Create a verification token, save it, and send email
      const verificationToken = new VerificationToken({
        _userId: existingUser._id,
        token: crypto.randomBytes(16).toString('hex'),
      });

      // Save the token
      verificationToken.save((err) => {
        if (err) return next(err);

        // Send the email
        sgMail.setApiKey(keys.sendGridKey);
        var mailOptions = {
          from: 'no-reply@camagru.com',
          to: email,
          subject: 'Account Verification Token',
          text: `Hello, ${existingUser.username}
        
        Please verify your account by clicking the link:
        https://${req.headers.host}/api/confirmation?token=${verificationToken.token}&email=${email}.`,
        };
        sgMail.send(mailOptions, undefined, (err) => {
          if (err) return next(err);
          res.send({
            message: `A verification email has been sent to ${existingUser.email}.`,
          });
        });
      });
    })
    .catch((err) => res.status(400).send({ error: err }));
};
