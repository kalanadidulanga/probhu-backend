import prisma from "../lib/prisma.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const createReview = async (req, res) => {
    try {
        const { clientName, rating, comment } = req.body;

        if (!clientName || !rating || !comment) {
            return ApiResponse.error(res, 'Client name, rating, and comment are required', 400);
        }

        const review = await prisma.review.create({
            data: {
                clientName,
                rating,
                comment,
            },
        });

        return ApiResponse.success(res, review, 'Review submitted successfully', 201);
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const { status } = req.query;

        const reviews = await prisma.review.findMany({
            where: status ? { status } : {},
            orderBy: { createdAt: 'desc' },
        });

        return ApiResponse.success(res, reviews, 'Reviews retrieved successfully');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

export const updateReviewStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['accepted', 'rejected'].includes(status)) {
            return ApiResponse.error(res, 'Invalid status value. Use "accepted" or "rejected"', 400);
        }

        const review = await prisma.review.update({
            where: { id: parseInt(id) },
            data: { status },
        });

        return ApiResponse.success(res, review, `Review ${status} successfully`);
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await prisma.review.delete({
            where: { id: parseInt(id) },
        });

        return ApiResponse.success(res, null, 'Review deleted successfully', 204);
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};
