// src/routes/contact.routes.js
import express from "express";
import {
    submitContactForm
} from "../controllers/contactForm.controller.js";

const router = express.Router();

router.post('/', submitContactForm);

export default router;