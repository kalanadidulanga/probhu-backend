import prisma from "../lib/prisma.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Create new service
export const createService = async (req, res) => {
    try {
        const { title, description, imgUrl } = req.body;

        if (!title || !description || !imgUrl) {
            return ApiResponse.error(res, 'All fields are required', 400);
        }

        const service = await prisma.service.create({
            data: {
                title,
                description,
                imgUrl,
            },
        });

        return ApiResponse.success(res, service, 'Service created successfully', 201);
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Get all services
export const getAllServices = async (req, res) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return ApiResponse.success(res, services, 'Services retrieved successfully');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Get service by ID
export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await prisma.service.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!service) {
            return ApiResponse.error(res, 'Service not found', 404);
        }

        return ApiResponse.success(res, service, 'Service retrieved successfully');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Update service
export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, imgUrl } = req.body;

        if (!title && !description && !imgUrl) {
            return ApiResponse.error(res, 'At least one field is required for update', 400);
        }

        const existingService = await prisma.service.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!existingService) {
            return ApiResponse.error(res, 'Service not found', 404);
        }

        const updatedService = await prisma.service.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title: title || existingService.title,
                description: description || existingService.description,
                imgUrl: imgUrl || existingService.imgUrl,
            },
        });

        return ApiResponse.success(res, updatedService, 'Service updated successfully');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Delete service
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const existingService = await prisma.service.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!existingService) {
            return ApiResponse.error(res, 'Service not found', 404);
        }

        await prisma.service.delete({
            where: {
                id: parseInt(id),
            },
        });

        return ApiResponse.success(res, null, 'Service deleted successfully', 204);
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};