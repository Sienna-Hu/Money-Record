import express from 'express';
import mongoose from 'mongoose';

import Tag from '../model/Tag.js';

const router = express.Router();

export const getTags = async (req, res) => { 
  try {
    const tags = await Tag.find({});
    console.log(tags);
    res.status(200).json(tags);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
