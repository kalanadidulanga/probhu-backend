// src/utils/apiResponse.js
export class ApiResponse {
    static success(res, data = null, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    static error(res, message = 'Error', statusCode = 400, errors = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors
        });
    }
}