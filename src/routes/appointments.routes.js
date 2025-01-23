import express from "express";
import { markAppointmentAsRead, createAppointment } from '../controllers/appointments.controller.js';

const router = express.Router();

router.post('/', createAppointment);
router.post('/:id/mark-as-read', markAppointmentAsRead);

export default router;