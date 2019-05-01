const User = require('../models/userModel');
const VerificationToken = require('../models/veificationTokenModel');
const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.jwtTokenSecret);
};

exports.signinPost = (req, res, next) => {
  res.json({ token: tokenForUser(req.body.username) });
};

exports.signupPost = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (!username || !password || !email) {
    return res
      .status(400)
      .send({ error: 'You must provide username/password/email' });
  }

  User.findOne({ username: username }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser)
      return res
        .status(400)
        .send({ error: 'Email/User is already registered' });

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
            .status(500)
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
        var mailOptions = {
          from: 'no-reply@camagru.com',
          to: email,
          subject: 'Account Verification Token',
          text: `Hello, ${username}\n
          Please verify your account by clicking the link:
          http://${req.headers.host}/confirmation?token=${
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
          // res.send({
          //   message: 'The account has been verified. Please log in.'
          // });
          res.json({ token: tokenForUser(existingUser) });
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
        http://${req.headers.host}/confirmation/${verificationToken.token}.`
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
