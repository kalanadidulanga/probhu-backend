// src/controllers/clients.controller.js
import prisma from "../lib/prisma.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Create new client
export const createClient = async (req, res) => {
    try {
        const { name, description, imgUrl } = req.body;

        if (!name || !imgUrl) {
            return ApiResponse.error(res, 'Name and image URL are required', 400);
        }

        const client = await prisma.client.create({
            data: {
                name,
                description,
                imgUrl,
            },
        });

        return ApiResponse.success(res, client, 'Client created successfully', 201);
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Get all clients
export const getAllClients = async (req, res) => {
    try {
        const clients = await prisma.client.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return ApiResponse.success(res, clients, 'Clients retrieved successfully');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Get client by ID
export const getClientById = async (req, res) => {
    try {
        const { id } = req.params;

        const client = await prisma.client.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!client) {
            return ApiResponse.error(res, 'Client not found', 404);
        }

        return ApiResponse.success(res, client, 'Client retrieved successfully');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Update client
export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, imgUrl } = req.body;

        if (!name && !description && !imgUrl) {
            return ApiResponse.error(res, 'At least one field is required for update', 400);
        }

        const existingClient = await prisma.client.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!existingClient) {
            return ApiResponse.error(res, 'Client not found', 404);
        }

        const updatedClient = await prisma.client.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: name || existingClient.name,
                description: description || existingClient.description,
                imgUrl: imgUrl || existingClient.imgUrl,
            },
        });

        return ApiResponse.success(res, updatedClient, 'Client updated successfully');
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};

// Delete client
export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        const existingClient = await prisma.client.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!existingClient) {
            return ApiResponse.error(res, 'Client not found', 404);
        }

        await prisma.client.delete({
            where: {
                id: parseInt(id),
            },
        });

        return ApiResponse.success(res, null, 'Client deleted successfully', 204);
    } catch (error) {
        return ApiResponse.error(res, error.message, 500);
    }
};