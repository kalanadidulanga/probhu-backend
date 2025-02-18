import express from 'express';
import { getAllServiceItems, createServiceItem, deleteServiceItem, updateServiceItem } from '../controllers/serviceItem.controller.js';

const router = express.Router();

router.get('/', getAllServiceItems);
router.post('/', createServiceItem);
router.delete('/:id', deleteServiceItem);
router.put('/:id', updateServiceItem);

export default router;
