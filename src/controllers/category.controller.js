import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "../utils/apiResponse.js";

const prisma = new PrismaClient();

export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        packages: {
          include: { serviceItems: true },
        },
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

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: id } });
    ApiResponse.success(res, null, "Category deleted successfully", 204);
  } catch (error) {
    ApiResponse.error(res, error.message, 500);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await prisma.category.update({
      where: { id: id },
      data: { name },
    });
    ApiResponse.success(res, category, "Category updated successfully", 200);
  } catch (error) {
    ApiResponse.error(res, error.message, 400);
  }
};
