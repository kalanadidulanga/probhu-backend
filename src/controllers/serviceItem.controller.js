import { ApiResponse } from "../utils/apiResponse.js";
import prisma from "../lib/prisma.js";

export const getAllServiceItems = async (req, res) => {
  try {
    const serviceItems = await prisma.serviceItem.findMany();
    ApiResponse.success(res, serviceItems);
  } catch (error) {
    ApiResponse.error(res, error.message, 500);
  }
};

export const createServiceItem = async (req, res) => {
  try {
    const { packageId, name, price } = req.body;
    const serviceItem = await prisma.serviceItem.create({
      data: { packageId, name, price },
    });
    ApiResponse.success(
      res,
      serviceItem,
      "Service Item created successfully",
      201
    );
  } catch (error) {
    ApiResponse.error(res, error.message, 400);
  }
};

export const updateServiceItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { packageId, name, price } = req.body;
    const updatedServiceItem = await prisma.serviceItem.update({
      where: { id: id },
      data: { packageId, name, price },
    });
    ApiResponse.success(
      res,
      updatedServiceItem,
      "Service Item updated successfully",
      200
    );
  } catch (error) {
    ApiResponse.error(res, error.message, 400);
  }
};

export const deleteServiceItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.serviceItem.delete({ where: { id: id } });
    ApiResponse.success(res, null, "Service Item deleted successfully", 204);
  } catch (error) {
    ApiResponse.error(res, error.message, 500);
  }
};
