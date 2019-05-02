const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const keys = require('./config/keys');
const logger = require('morgan');
const routes = require('./routes/routes');
const cors = require('cors');
const expressValidator = require('express-validator');

const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true }, () =>
  console.log('MongoDB connected')
);
mongoose.set('useCreateIndex', true);

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(expressValidator());

routes(app);

const port = process.env.PORT || 4004;
const server = http.createServer(app);
server.listen(port, () => console.log('Server listening on:', port));
