import { celebrator, Joi } from 'celebrate';

export const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[\w\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

export const celebrate = celebrator(
  { mode: 'full' },
  { abortEarly: false },
);

export const schemaObjectId = Joi.string().hex().length(24);
export const schemaURL = Joi.string().regex(urlRegex);
