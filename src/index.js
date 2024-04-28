const path = require('path');
const express = require('express');
const moduleAlias = require('module-alias');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

// Define aliases
moduleAlias.addAlias('@', path.join(__dirname, ''));

require('dotenv').config({ path: __dirname + '/.env' });

const { connectDB } = require('@/utils/db');

const app = express();

connectDB();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(hpp());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(morgan('dev'));
app.use(express.json());

require('@/routes/index')(app);

module.exports = app;
