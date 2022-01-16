import express from 'express';
import passport from 'passport';

const router = express.Router();

export function callback(req, res) {
  res.redirect('/mine')
}

export function logout(req, res) {
  req.session.destroy(function (err) {
    req.logOut()
    res.json('success')
  });
}

export default router;