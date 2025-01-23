import express from "express";
import {
    createReview,
    getAllReviews,
    updateReviewStatus,
    deleteReview,
} from "../controllers/reviews.controller.js";

const router = express.Router();

// Client-Side
router.post('/', createReview);

// Admin Panel
router.get('/', getAllReviews);
router.put('/:id/status', updateReviewStatus);
router.delete('/:id', deleteReview);

export default router;
