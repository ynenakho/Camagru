import User, { IUser } from '../models/user.model';
import VerificationToken from '../models/verificationToken.model';
import keys from '../config/keys';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { generatePassword } from '../helpers/generatePassword';
import { Request, Response, NextFunction } from 'express';
import HttpError from '../helpers/HttpError';

const tokenForUser = (user: IUser) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.jwtTokenSecret);
};

export const currentGet = (req: Request, res: Response) => {
  res.json({
    id: req.user?.id,
    username: req.user?.username,
    email: req.user?.email,
    getNotified: req.user?.getNotified,
  });
};

export const forgotPasswordPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw new HttpError.BadRequest('Email not registered');
    }
    const newPassword = generatePassword(6);
    user.password = bcrypt.hashSync(newPassword, 10);
    user.save((err) => {
      if (err) return next(err);
      // Send the email
      sgMail.setApiKey(keys.sendGridKey);
      const mailOptions = {
        from: 'no-reply@camagru.com',
        to: email,
        subject: 'New Password',
        text: `Hello, ${user.username}\n
        Your new password is ${newPassword}`,
      };
      sgMail.send(mailOptions, undefined, (err) => {
        if (err) return next(err);
        res.send({
          message: `New Password has been sent to ${email}.`,
        });
      });
    });
  } catch (err) {
    return next(err);
  }
};

export const updateProfilePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    username,
    oldPassword,
    newPassword,
    email,
    getNotified,
    id,
  } = req.body;

  try {
    const existingUser = await User.findById(id);
    if (!existingUser) throw new HttpError.NotFound("User doesn't exist");
    existingUser.comparePassword(oldPassword, async (err, isMatch) => {
      if (err) return next(err);
      if (!isMatch)
        try {
          throw new HttpError.BadRequest(
            'Password does not match the password that you have on your profile'
          );
        } catch (err) {
          return next(err);
        }
      if (existingUser.username !== username) {
        try {
          const user = await User.findOne({ username });
          if (user) throw new HttpError.BadRequest('Username already taken');
        } catch (err) {
          return next(err);
        }
      }
      if (existingUser.email !== email) {
        try {
          const user = await User.findOne({ email });
          if (user) throw new HttpError.BadRequest('Email already taken');
        } catch (err) {
          return next(err);
        }
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
  } catch (e) {
    return next(e);
  }
};

export const signinPost = (req: Request, res: Response) => {
  if (req.user) {
    res.json({ token: tokenForUser(req.user) });
  }
};

export const signupPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const existingUser = await User.findOne({ username: username }).exec();
  try {
    if (existingUser)
      throw new HttpError.BadRequest('Email/User is already registered');
  } catch (err) {
    return next(err);
  }
  const hash = bcrypt.hashSync(password, 10);
  const user = new User({
    username,
    password: hash,
    email,
  });

  user.save((err: any) => {
    if (err) {
      // Duplicate username
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(
          new HttpError.BadRequest('Email/User is already registered')
        );
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
};

export const confirmationGet = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
        .catch(next);
    })
    .catch(next);
};

export const resendTokenPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
