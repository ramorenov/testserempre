const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const { handlerError } = require('./middlewares/index');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
routes(app);
app.use(handlerError);

exports.app = functions.https.onRequest(app);
