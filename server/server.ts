import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';
import path from 'path';

import routes from './routes/routes';

import keys from './config/keys';

import { IUser } from './models/user.model';
import errorHandler from './helpers/errorHandler';

const app = express();

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('MongoDB connected')
);
mongoose.set('useCreateIndex', true);

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(passport.initialize());

routes(app);

app.use(errorHandler);

// Server  static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../../client', 'build', 'index.html')
    );
  });
}

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port, () => console.log('Server listening on:', port));
