import express from 'express';
import mongoose from 'mongoose';

import Record from '../model/Record.js';

const router = express.Router();

export const getPersonalRecords = async (req, res) => { 
    try {
        const records = await Record.find({user: req.body.user});
        const returned = records.map(record => ({
            id: record.id,
            date: record.date,
            amount: record.amount / record.splitNum,
            tag: record.tag,
            description: record.description
        }))
        res.status(200).json(returned);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCollectionRecord= async (req, res) => { 
    try {
        const records = await Record.find({ hasCollected: false });
        const returned = records.map(record => ({
            id: record.id,
            date: record.date,
            amount: (record.amount / record.splitNum).toFixed(2),
            tag: record.tag,
            splitPP: record.splitPP,
            description: record.description,
            hasCollected: record.hasCollected
        }))
        res.status(200).json(returned);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createRecord = async (req, res) => {
    const { user, date, tag, amount, splitpp, description } = req.body;
    const splitNum = splitpp == null ? 1 : splitpp.length;
    const hasCollected = splitpp == null ? true : false;

    console.log(req.body)

    const newRecord = new Record({ user, date, tag, amount, splitpp, splitNum, description, hasCollected })

    try {
        await newRecord.save();

        res.status(201).json(newRecord);
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message });
    }
}

// export const updatePost = async (req, res) => {
//     const { id } = req.params;
//     const { title, message, creator, selectedFile, tags } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

//     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//     res.json(updatedPost);
// }

export const deleteRecord = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Record.findByIdAndRemove(id);

    res.json({ message: "Record deleted successfully." });
}

export default router;