// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/apiResponse.js';
import prisma from '../lib/prisma.js';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return ApiResponse.error(res, 'No token provided', 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true
            }
        });

        if (!user) {
            return ApiResponse.error(res, 'User not found', 404);
        }

        req.user = user;
        next();
    } catch (error) {
        ApiResponse.error(res, 'Invalid token', 401);
    }
};