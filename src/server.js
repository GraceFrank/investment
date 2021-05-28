import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import logger from 'morgan';

import globalErrHandler from './controllers/errorController';
import AppError from './utils/appError';
import rootRouter from './routes';

dotenv.config();
const server = express();
// Set security HTTP headers
server.use(helmet());

// Limit request from the same API
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many Request from this IP, please try again in an hour',
});
server.use('/api', limiter);
server.use(logger('dev'));
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(express.json());

// Data sanitization against Nosql query injection
server.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
server.use(xss());

// Prevent parameter pollution
server.use(hpp());

server.use('/api/v1', rootRouter);
// handle undefined Routes
server.use('*', (req, res, next) => {
  const err = new AppError(404, 'fail', 'undefined route');
  next(err, req, res, next);
});

server.use(globalErrHandler);

export default server;
