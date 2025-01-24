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
                date: new Date(date), // Convert date string to Date object
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

// Get appointments with pagination
export const getAppointments = async (req, res) => {
    try {
        // Extract pagination parameters from query, with defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Optional filters
        const filters = {
            ...(req.query.status && { status: req.query.status }),
            ...(req.query.category && { category: req.query.category }),
        };

        // Fetch total count for pagination metadata
        const totalAppointments = await prisma.appointment.count({ where: filters });
        const totalPages = Math.ceil(totalAppointments / limit);

        // Fetch appointments with pagination
        const appointments = await prisma.appointment.findMany({
            where: filters,
            skip: skip,
            take: limit,
            orderBy: {
                createdAt: 'desc' // Optional: order by most recent first
            },
            select: {
                id: true,
                fullName: true,
                phoneNumber: true,
                email: true,
                date: true,
                category: true,
                status: true,
                createdAt: true
            }
        });

        return ApiResponse.success(res, {
            appointments,
            pagination: {
                currentPage: page,
                totalPages,
                totalAppointments,
                pageSize: limit
            }
        }, 'Appointments retrieved successfully');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};