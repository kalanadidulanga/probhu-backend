// src/routes/user.routes.js
import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { ApiResponse } from '../utils/apiResponse.js';

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
    ApiResponse.success(res, { user: req.user });
});

export default router;