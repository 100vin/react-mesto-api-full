import { Joi, Segments } from 'celebrate';
import { celebrate, schemaObjectId, schemaURL } from './common.js';

export const celebrateBodyCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: schemaURL.required(),
  }),
});

export const celebrateParamsCardId = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: schemaObjectId.required(),
  }).required(),
});
