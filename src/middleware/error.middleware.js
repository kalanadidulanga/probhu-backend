// src/middleware/error.middleware.js
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle Multer errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File size too large. Maximum size is 50MB.",
    });
  }

  if (err.code === "INVALID_FILE_TYPE") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      message: "File upload error: " + err.message,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
