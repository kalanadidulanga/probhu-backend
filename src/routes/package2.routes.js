// src/routes/package2.routes.js
import express from "express";
import {
    createPackage2,
    getAllPackage2s,
    getPackage2ById,
    updatePackage2,
    deletePackage2,
} from "../controllers/package2.controller.js";

const router = express.Router();

router.post('/', createPackage2);
router.get('/', getAllPackage2s);
router.get('/:id', getPackage2ById);
router.put('/:id', updatePackage2);
router.delete('/:id', deletePackage2);

export default router;