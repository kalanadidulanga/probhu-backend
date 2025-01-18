// src/middleware/error.middleware.js
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
};