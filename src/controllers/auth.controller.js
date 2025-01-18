// src/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return ApiResponse.error(res, 'Email already exists', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        ApiResponse.success(res, {
            user: { id: user.id, email: user.email, name: user.name },
            token
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return ApiResponse.error(res, 'Invalid credentials', 401);
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        ApiResponse.success(res, {
            user: { id: user.id, email: user.email, name: user.name },
            token
        });
    } catch (error) {
        next(error);
    }
};

