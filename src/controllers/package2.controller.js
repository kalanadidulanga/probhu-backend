//src/controllers/package2.controller.js
import prisma from "../lib/prisma.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Create new package2
export const createPackage2 = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        const package2 = await prisma.package2.create({
            data: {
                title,
                imageUrl
            }
        });
        return ApiResponse.success(res, package2, 'Package created', 201);
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Get all package2s
export const getAllPackage2s = async (req, res) => {
    try {
        const package2s = await prisma.package2.findMany({
            orderBy: {
                // createdAt: 'desc'
                createdAt: 'asc'
            }
        });
        return ApiResponse.success(res, package2s, 'Packages retrieved');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Get package2 by ID
export const getPackage2ById = async (req, res) => {
    try {
        const { id } = req.params;
        const package2 = await prisma.package2.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!package2) {
            return ApiResponse.error(res, 'Package not found', 404);
        }
        return ApiResponse.success(res, package2, 'Package retrieved');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Update package2
export const updatePackage2 = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;
        const updatedPackage2 = await prisma.package2.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title,
                imageUrl
            }
        });
        return ApiResponse.success(res, updatedPackage2, 'Package updated');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Delete package2
export const deletePackage2 = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.package2.delete({
            where: {
                id: parseInt(id)
            }
        });
        return ApiResponse.success(res, null, 'Package deleted', 204);
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};