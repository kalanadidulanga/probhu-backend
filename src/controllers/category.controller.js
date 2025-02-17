import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "../utils/apiResponse.js";

const prisma = new PrismaClient();

export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        packages: true,
      },
    });
    ApiResponse.success(res, categories);
  } catch (error) {
    ApiResponse.error(res, error.message, 500);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({ data: { name } });
    ApiResponse.success(res, category, "Category created successfully", 201);
  } catch (error) {
    ApiResponse.error(res, error.message, 400);
  }
};
