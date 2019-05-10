const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const keys = require('./config/keys');
const logger = require('morgan');
const routes = require('./routes/routes');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true }, () =>
  console.log('MongoDB connected')
);
mongoose.set('useCreateIndex', true);

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

routes(app);

// Server  static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 4004;
const server = http.createServer(app);
server.listen(port, () => console.log('Server listening on:', port));
