import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';
import {
  celebrateBodyCard,
  celebrateParamsCardId,
} from '../validators/cards.js';

export const router = Router();

router.get('/', getCards);
router.post('/', celebrateBodyCard, createCard);
router.delete('/:cardId', celebrateParamsCardId, deleteCard);
router.put('/:cardId/likes', celebrateParamsCardId, likeCard);
router.delete('/:cardId/likes', celebrateParamsCardId, dislikeCard);
