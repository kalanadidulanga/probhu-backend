import prisma from "../lib/prisma.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Create a Category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: { name },
    });
    return ApiResponse.success(
      res,
      category,
      "Category created successfully",
      201
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      "Failed to create category",
      500,
      error.message
    );
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { packages: true },
    });
    return ApiResponse.success(
      res,
      categories,
      "Categories retrieved successfully"
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      "Failed to retrieve categories",
      500,
      error.message
    );
  }
};

// Create a Package
export const createPackage = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const packageItem = await prisma.package.create({
      data: { name, categoryId },
    });
    return ApiResponse.success(
      res,
      packageItem,
      "Package created successfully",
      201
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      "Failed to create package",
      500,
      error.message
    );
  }
};

// Get All Packages by Category
export const getPackagesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const packages = await prisma.package.findMany({
      where: { categoryId: parseInt(categoryId) },
      include: { priceLists: true },
    });
    return ApiResponse.success(
      res,
      packages,
      "Packages retrieved successfully"
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      "Failed to retrieve packages",
      500,
      error.message
    );
  }
};

// Add Price List to a Package
export const addPriceList = async (req, res) => {
  try {
    const { title, price, packageId } = req.body;
    const priceList = await prisma.priceList.create({
      data: { title, price: parseFloat(price), packageId },
    });
    return ApiResponse.success(
      res,
      priceList,
      "Price list added successfully",
      201
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      "Failed to add price list",
      500,
      error.message
    );
  }
};

// Get All Price Lists for a Package
export const getPriceListByPackage = async (req, res) => {
  try {
    const { packageId } = req.params;
    const priceLists = await prisma.priceList.findMany({
      where: { packageId: parseInt(packageId) },
    });
    return ApiResponse.success(
      res,
      priceLists,
      "Price lists retrieved successfully"
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      "Failed to retrieve price lists",
      500,
      error.message
    );
  }
};

// Delete a Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: parseInt(id) } });
    return ApiResponse.success(res, null, "Category deleted successfully");
  } catch (error) {
    return ApiResponse.error(
      res,
      "Failed to delete category",
      500,
      error.message
    );
  }
};

// Delete a Package
export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.package.delete({ where: { id: parseInt(id) } });
    return ApiResponse.success(res, null, "Package deleted successfully");
  } catch (error) {
    return ApiResponse.error(
      res,
      "Failed to delete package",
      500,
      error.message
    );
  }
};

// Delete a Price List Item
export const deletePriceList = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.priceList.delete({ where: { id: parseInt(id) } });
    return ApiResponse.success(res, null, "Price list deleted successfully");
  } catch (error) {
    return ApiResponse.error(
      res,
      "Failed to delete price list",
      500,
      error.message
    );
  }
};
