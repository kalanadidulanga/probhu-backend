// src/controllers/appointments.controller.js
import prisma from "../lib/prisma.js";
import { ApiResponse } from "../utils/apiResponse.js";
import nodemailer from "nodemailer";

// Create new appointment and send email to admin
export const createAppointment = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, date, category, location } = req.body;

        if (!fullName || !phoneNumber || !date || !category) {
            return ApiResponse.error(res, 'All required fields must be provided', 400);
        }

        const appointment = await prisma.appointment.create({
            data: {
                fullName,
                phoneNumber,
                email: email || null,
                date,
                category,
                location: location || null,
            },
        });

        await sendEmailToAdmin(appointment);

        return ApiResponse.success(res, appointment, 'Appointment created and email sent', 201);
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Helper function to send email to admin
async function sendEmailToAdmin(appointment) {
    const transporter = nodemailer.createTransport({
        // Configure your email transporter here
        host: 'mail.prabhu.lk',
        port: 587,
        secure: false,
        auth: {
            user: 'noreply@prabhu.lk',
            pass: 'saloonPrabhu@25',
        },
    });

    const mailOptions = {
        from: 'noreply@prabhu.lk',
        to: 'info@prabhu.lk',
        subject: 'New Appointment Booking',
        text: `
      A new appointment has been booked:
      Full Name: ${appointment.fullName}
      Phone Number: ${appointment.phoneNumber}
      Email: ${appointment.email || 'N/A'}
      Date: ${appointment.date.toISOString().slice(0, 10)}
      Category: ${appointment.category}
      Location: ${appointment.location || 'N/A'}
    `,
    };

    await transporter.sendMail(mailOptions);
}

// Mark appointment as read
export const markAppointmentAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await prisma.appointment.update({
            where: { id: parseInt(id) },
            data: { status: 'read' },
        });

        return ApiResponse.success(res, appointment, 'Appointment marked as read');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};