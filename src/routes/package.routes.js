import express from 'express';
import { getAllPackages, createPackage, deletePackage, updatePackage } from '../controllers/package.controller.js';

const router = express.Router();

router.get('/', getAllPackages);
router.post('/', createPackage);
router.delete('/:id', deletePackage);
router.put('/:id', updatePackage);

export default router;
