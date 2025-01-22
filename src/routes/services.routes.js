// src/routes/services.routes.js
import express from "express";
import {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
} from "../controllers/services.controller.js";  // Note the .js extension

const router = express.Router();

router.post('/', createService);
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;