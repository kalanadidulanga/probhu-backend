import { ApiResponse } from "../utils/apiResponse.js";
import prisma from "../lib/prisma.js";

export const getAllPackages = async (req, res) => {
  try {
    const packages = await prisma.package.findMany({
      include: { services: true },
    });
    ApiResponse.success(res, packages);
  } catch (error) {
    ApiResponse.error(res, error.message, 500);
  }
};

export const createPackage = async (req, res) => {
  try {
    const { categoryId, name, description, priceMin, priceMax } = req.body;
    const newPackage = await prisma.package.create({
      data: { categoryId, name, description, priceMin, priceMax },
    });
    ApiResponse.success(res, newPackage, "Package created successfully", 201);
  } catch (error) {
    ApiResponse.error(res, error.message, 400);
  }
};
