console.log('ini');
import gradesRouter from './routes/routes.js';
import express from 'express';
import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'grades-api.log' }),
  ],
  format: combine(label({ label: 'grades-api.log' }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());

app.use('/grades', gradesRouter);
app.listen(3000, async () => {
  try {
    await logger.info('API Started!');
  } catch (err) {
    logger.error(err);
  }
});
