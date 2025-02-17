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
