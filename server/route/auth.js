import express from 'express';
import passport from 'passport';
import { callback, logout } from '../controller/auth.js';
import { generateToken, sendToken } from '../utils/token.js';

const router = express.Router()

router.route('/google')
    .post(passport.authenticate('google-token', {session: false}), function(req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            user: req.user
        };
        next();
    }, generateToken, sendToken);

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', logout)

export default router;