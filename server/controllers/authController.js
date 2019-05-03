const User = require('../models/userModel');
const VerificationToken = require('../models/veificationTokenModel');
const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const passwordGen = require('../helpers/passwordGenerator');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.jwtTokenSecret);
};

exports.currentGet = (req, res, next) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    getNotified: req.user.getNotified
  });
};

exports.forgotPasswordPost = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);
    if (!existingUser)
      return res.status(400).json({ error: 'Email not registered' });
    const newPassword = passwordGen(6);
    existingUser.password = bcrypt.hashSync(newPassword, 10);
    existingUser.save(err => {
      if (err) return next(err);

      // Send the email
      sgMail.setApiKey(keys.sendGridKey);
      const mailOptions = {
        from: 'no-reply@camagru.com',
        to: email,
        subject: 'Account Verification Token',
        text: `Hello, ${existingUser.username}
        Your new password is ${newPassword}`
      };
      sgMail.send(mailOptions, err => {
        if (err) return next(err);
        res.send({
          message: `New Password has been sent to ${email}.`
        });
      });
    });
  });
};

exports.updateProfilePost = (req, res, next) => {
  const username = req.body.username;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const email = req.body.email;
  const getNotified = req.body.getNotified;
  const id = req.body.id;

  User.findById(id, (err, existingUser) => {
    if (err) return next(err);
    existingUser.comparePassword(oldPassword, (err, isMatch) => {
      if (err) return next(err);
      if (!isMatch)
        return res.status(400).json({
          error:
            'Password does not match the password that you have on your profile'
        });
      if (existingUser.username !== username) {
        User.findOne({ username }, (err, foundUser) => {
          if (err) return next(err);
          if (foundUser)
            return res.status(400).json({ error: 'Username already taken' });
        });
      }
      if (existingUser.email !== email) {
        User.findOne({ email }, (err, foundUser) => {
          if (err) return next(err);
          if (foundUser)
            return res.status(400).json({ error: 'Email already taken' });
        });
      }
      if (newPassword) {
        existingUser.password = bcrypt.hashSync(newPassword, 10);
      }
      existingUser.username = username;
      existingUser.email = email;
      existingUser.getNotified = getNotified;
      existingUser.save(err => {
        if (err) return next(err);
        return res.json({ token: tokenForUser(existingUser) });
      });
    });
  });
};

exports.signinPost = (req, res, next) => {
  res.json({ token: tokenForUser(req.user) });
};

exports.signupPost = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  User.findOne({ username: username }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser)
      return res
        .status(400)
        .json({ error: 'Email/User is already registered' });

    const hash = bcrypt.hashSync(password, 10);
    const user = new User({
      username,
      password: hash,
      email
    });

    user.save(err => {
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
        token: crypto.randomBytes(16).toString('hex')
      });

      verificationToken.save(err => {
        if (err) return next(err);

        // Send the email
        sgMail.setApiKey(keys.sendGridKey);
        const mailOptions = {
          from: 'no-reply@camagru.com',
          to: email,
          subject: 'Account Verification Token',
          text: `Hello, ${username}\n
          Please verify your account by clicking the link:
          http://${req.headers.host}/api/confirmation?token=${
            verificationToken.token
          }&email=${email}.`
        };
        sgMail.send(mailOptions, err => {
          if (err) return next(err);
          res.send({
            message: `A verification email has been sent to ${email}.`
          });
        });
      });
    });
  });
};

exports.confirmationGet = (req, res, next) => {
  const token = req.query.token;
  const email = req.query.email;

  VerificationToken.findOne({ token: token }, (err, existingToken) => {
    if (err) return next(err);
    if (!existingToken)
      return res.status(400).send({
        error: 'We were unable to verify you. Token might be expired.'
      });

    User.findOne(
      { _id: existingToken._userId, email: email },
      (err, existingUser) => {
        if (err) return next(err);
        if (!existingUser)
          return res.status(400).send({
            error: 'We were unable to find a user for this token.'
          });
        if (existingUser.isVerified)
          return res
            .status(400)
            .send({ error: 'This user has already been verified.' });

        existingUser.isVerified = true;
        existingUser.save(err => {
          if (err) return next(err);
          res.status(301).redirect(keys.clientURI + '/signin');
        });
      }
    );
  });
};

exports.resendTokenPost = (req, res, next) => {
  const email = req.body.email;

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);

    if (!existingUser)
      return res
        .status(400)
        .send({ error: 'We were unable to find a user with that email.' });
    if (existingUser.isVerified)
      return res.status(400).send({
        error: 'This account has already been verified. Please log in.'
      });

    // Create a verification token, save it, and send email
    const verificationToken = new VerificationToken({
      _userId: existingUser._id,
      token: crypto.randomBytes(16).toString('hex')
    });

    // Save the token
    verificationToken.save(err => {
      if (err) return next(err);

      // Send the email
      sgMail.setApiKey(keys.sendGridKey);
      var mailOptions = {
        from: 'no-reply@camagru.com',
        to: email,
        subject: 'Account Verification Token',
        text: `Hello, ${existingUser.username}
        
        Please verify your account by clicking the link:
        http://${req.headers.host}/api/confirmation/${verificationToken.token}.`
      };
      sgMail.send(mailOptions, err => {
        if (err) return next(err);
        res.send({
          message: `A verification email has been sent to ${
            existingUser.email
          }.`
        });
      });
    });
  });
};
