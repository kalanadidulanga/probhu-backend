// src/routes/services.routes.js
import express from "express";
import {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
} from "../controllers/packages.controller.js";

const router = express.Router();

router.post("/", createPackage);
router.get("/", getAllPackages);
router.get("/:id", getPackageById);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

export default router;