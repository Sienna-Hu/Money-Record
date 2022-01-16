import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

export const login = (req, res) => { 
  res.send('login')
}

export const homepage = async (req, res) => {
  try {
    // const stories = await Story.find({ user: req.user.id }).lean()
    res.send("mine")
  } catch (err) {
    console.error(err)
    res.send('error/500')
  }
}

export default router;