import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { Error } from 'mongoose';
import User, { IUser } from '../models/user.model';
import keys from '../config/keys';

const localOptions = {};
const localLogin = new LocalStrategy(
  localOptions,
  (username, password, done) => {
    User.findOne({ username: username }, (err: Error, existingUser: IUser) => {
      if (err) return done(err);
      if (!existingUser) {
        console.log('GOT HERE');

        return done(null, false, { message: 'Incorrect username/password.' });
      }
      existingUser.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch)
          return done(null, false, { message: 'Incorrect username/password.' });
        if (!existingUser.isVerified)
          return done(null, false, {
            message: 'Account has not been verified.',
          });
        done(null, existingUser);
      });
    });
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwtTokenSecret,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err: Error, existingUser: IUser) => {
    if (err) return done(err, false);
    if (!existingUser) return done(null, false);
    return done(null, existingUser);
  });
});

passport.use(localLogin);
passport.use(jwtLogin);
