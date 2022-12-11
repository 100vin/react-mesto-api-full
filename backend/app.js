import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { constants } from 'http2';
import { errors } from 'celebrate';
import { login, createUser } from './controllers/users.js';
import { auth } from './middlewares/auth.js';
import { router as userRouter } from './routes/users.js';
import { router as cardRouter } from './routes/cards.js';
import { celebrateBodyUser, celebrateBodyAuth } from './validators/users.js';
import { NotFoundError } from './errors/index.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

// const { PORT = 3000 } = process.env;
const { PORT = 3001 } = process.env;

const config = dotenv.config({
  path: path.resolve(process.env.NODE_ENV === 'production' ? '.env' : '.env.common'),
}).parsed;

const app = express();

app.set('config', config);

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

mongoose.set('runValidators', true);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrateBodyAuth, login);
app.post('/signup', celebrateBodyUser, createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = err.message || 'Неизвестная ошибка';
  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
