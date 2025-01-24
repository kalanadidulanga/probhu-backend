import express from "express";
import { markAppointmentAsRead, createAppointment, getAppointments } from '../controllers/appointments.controller.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/:id/mark-as-read', markAppointmentAsRead);
router.get('/', getAppointments);

export default router;