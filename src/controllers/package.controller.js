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
    const { categoryId, name, description } = req.body;
    const newPackage = await prisma.package.create({
      data: { categoryId, name, description: description || null },
    });
    ApiResponse.success(res, newPackage, "Package created successfully", 201);
  } catch (error) {
    ApiResponse.error(res, error.message, 400);
  }
};

export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.serviceItem.deleteMany({ where: { packageId: id } });
    await prisma.package.delete({ where: { id: id } });
    return ApiResponse.success(res, null, "Package deleted", 204);
  } catch (error) {
    return ApiResponse.error(res, error.message, 500);
  }
};

export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedPackage = await prisma.package.update({
      where: { id: id },
      data: { name, description: description || null },
    });
    ApiResponse.success(
      res,
      updatedPackage,
      "Package updated successfully",
      200
    );
  } catch (error) {
    ApiResponse.error(res, error.message, 400);
  }
};
