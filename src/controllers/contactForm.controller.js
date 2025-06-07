// src/controllers/contactForm.controller.js
import { ApiResponse } from "../utils/apiResponse.js";
import nodemailer from "nodemailer";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return ApiResponse.error(res, "Missing required fields", 400);
    }

    // Configure Nodemailer transporter
    // Replace hardcoded values with:
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: "noreply@prabhu.lk", // Sender's email address
      to: "info@prabhu.lk", // Recipient's email address
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${
        phone || "Not provided"
      }\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond with success
    return ApiResponse.success(
      res,
      { name, email, phone, message },
      "Contact form submitted successfully",
      201
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return ApiResponse.error(
      res,
      "Failed to submit contact form. Please try again later.",
      500
    );
  }
};
