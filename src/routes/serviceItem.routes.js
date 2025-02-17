import express from 'express';
import { getAllServiceItems, createServiceItem } from '../controllers/serviceItem.controller.js';

const router = express.Router();

router.get('/', getAllServiceItems);
router.post('/', createServiceItem);

export default router;
