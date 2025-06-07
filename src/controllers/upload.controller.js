// src/controllers/upload.controller.js
import { ApiResponse } from "../utils/apiResponse.js";

export const uploadImage = async (req, res, next) => {
  try {
    console.log("Upload request received");
    console.log("File:", req.file);

    if (!req.file) {
      console.log("No file in request");
      return ApiResponse.error(res, "No file uploaded", 400);
    }

    // Construct the file URL
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    console.log("File uploaded successfully:", fileUrl);

    return ApiResponse.success(
      res,
      {
        fileUrl,
        fileName: req.file.filename,
        size: req.file.size,
      },
      "File uploaded successfully",
      201
    );
  } catch (error) {
    console.error("Upload error:", error);
    next(error);
  }
};
