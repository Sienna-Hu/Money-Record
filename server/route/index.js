import express from 'express';
import { ensureAuth, ensureGuest } from '../middleware/auth.js';
import { login, homepage } from '../controller/index.js';

const router = express.Router()

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, login)

// @desc    Dashboard
// @route   GET /mine
router.get('/mine', ensureAuth, homepage)

export default router;