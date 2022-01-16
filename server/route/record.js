import express from 'express';
import { getPersonalRecords, getCollectionRecord, createRecord, deleteRecord } from '../controller/record.js';

const router = express.Router()

router.post('/personal', getPersonalRecords);
router.post('/collection', getCollectionRecord);
router.post('/add', createRecord);
router.delete('/delete/:id', deleteRecord);

export default router;