//src/controllers/packages.controller.js
import prisma from "../lib/prisma.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Create new package
export const createPackage = async (req, res) => {
    try {
        const { title, price, description, imageUrl } = req.body;
        const pkg = await prisma.package.create({ data: { title, price, description, imageUrl } });
        return ApiResponse.success(res, pkg, 'Package created', 201);
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Get all packages
export const getAllPackages = async (req, res) => {
    try {
        const packages = await prisma.package.findMany({ orderBy: { createdAt: 'desc' } });
        return ApiResponse.success(res, packages, 'Packages retrieved');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Get package by ID
export const getPackageById = async (req, res) => {
    try {
        const { id } = req.params;
        const pkg = await prisma.package.findUnique({ where: { id: parseInt(id) } });
        if (!pkg) return ApiResponse.error(res, 'Package not found', 404);
        return ApiResponse.success(res, pkg, 'Package retrieved');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Update package
export const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description, imageUrl } = req.body;
        const updatedPackage = await prisma.package.update({
            where: { id: parseInt(id) },
            data: { title, price, description, imageUrl },
        });
        return ApiResponse.success(res, updatedPackage, 'Package updated');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Delete package
export const deletePackage = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.package.delete({ where: { id: parseInt(id) } });
        return ApiResponse.success(res, null, 'Package deleted', 204);
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};