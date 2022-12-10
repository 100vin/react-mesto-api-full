import { constants } from 'http2';
import { Card } from '../models/card.js';
import { NotFoundError, BadRequestError, ForbiddenError } from '../errors/index.js';

export const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

export const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(constants.HTTP_STATUS_OK).send(card);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Некорректные данные для карточки.'));
    } else {
      next(err);
    }
  }
};

export const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Карточка не найдена.');
    } else if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Отсутствуют права доступа.');
    } else {
      card.remove();
      res.status(constants.HTTP_STATUS_OK).send(card);
    }
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Некорректные данные для карточки.'));
    } else {
      next(err);
    }
  }
};

export const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка не найдена.');
    } else res.status(constants.HTTP_STATUS_OK).send(card);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Некорректные данные для карточки.'));
    } else {
      next(err);
    }
  }
};

export const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка не найдена.');
    } else res.status(constants.HTTP_STATUS_OK).send(card);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Некорректные данные для карточки.'));
    } else {
      next(err);
    }
  }
};
