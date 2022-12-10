import { Joi, Segments } from 'celebrate';
import { celebrate, schemaObjectId, schemaURL } from './common.js';

const schemaName = Joi.string().min(2).max(30);
const schemaAbout = Joi.string().min(2).max(30);
const schemaEmail = Joi.string().email().required();
const schemaPassword = Joi.string().required();

export const celebrateBodyUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: schemaName,
    about: schemaAbout,
    avatar: schemaURL,
    email: schemaEmail,
    password: schemaPassword,
  }),
});

export const celebrateBodyAuth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: schemaEmail,
    password: schemaPassword,
  }),
});

export const celebrateBodyProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: schemaName,
    about: schemaAbout,
  }),
});

export const celebrateBodyAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: schemaURL,
  }),
});

export const celebrateParamsUserId = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.alternatives().try(
      Joi.string().equal('me'),
      schemaObjectId,
    ).required(),
  }).required(),
});
