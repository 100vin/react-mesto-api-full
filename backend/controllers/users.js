import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { constants } from 'http2';
import { User } from '../models/user.js';
import { NotFoundError, BadRequestError, ConflictError } from '../errors/index.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { JWT_SECRET } = req.app.get('config');
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId === 'me' ? req.user._id : req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь не найден.');
    } else res.status(constants.HTTP_STATUS_OK).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректные данные для пользователя.'));
    } else {
      next(err);
    }
  }
};

export const createUser = async (req, res, next) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const document = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    const user = document.toObject();
    delete user.password;
    res.status(constants.HTTP_STATUS_OK).send(user);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Пользователь с такой почтой уже существует.'));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные для пользователя.'));
    } else {
      next(err);
    }
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь не найден.');
    } else res.status(constants.HTTP_STATUS_OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Некорректные данные для пользователя.'));
    } else {
      next(err);
    }
  }
};

export const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь не найден.');
    } else res.status(constants.HTTP_STATUS_OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Некорректные данные для пользователя.'));
    } else {
      next(err);
    }
  }
};
