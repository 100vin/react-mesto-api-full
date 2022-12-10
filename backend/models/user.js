import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { UnauthorizedError } from '../errors/index.js';
import { urlRegex } from '../validators/common.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => urlRegex.test(url),
      message: () => 'Некорректный формат ссылки на аватар',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: () => 'Некорректный адрес электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
  statics: {
    async findUserByCredentials(email, password) {
      const document = await this.findOne({ email }).select('+password');
      if (!document) {
        throw new UnauthorizedError('Неправильная почта или пароль');
      }
      const matched = await bcrypt.compare(password, document.password);
      if (!matched) {
        throw new UnauthorizedError('Неправильная почта или пароль');
      }
      const user = document.toObject();
      delete user.password;
      return user;
    },
  },
});

export const User = mongoose.model('user', userSchema);
