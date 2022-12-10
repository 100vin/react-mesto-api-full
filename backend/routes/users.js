import { Router } from 'express';
import {
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users.js';
import {
  celebrateBodyAvatar,
  celebrateBodyProfile,
  celebrateParamsUserId,
} from '../validators/users.js';

export const router = Router();

router.get('/', getUsers);
router.get('/:userId', celebrateParamsUserId, getUser);
router.patch('/me', celebrateBodyProfile, updateUserProfile);
router.patch('/me/avatar', celebrateBodyAvatar, updateUserAvatar);
