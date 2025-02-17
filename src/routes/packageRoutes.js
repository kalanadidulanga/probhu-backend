import express from "express";
import {
  createCategory,
  getCategories,
  createPackage,
  getPackagesByCategory,
  addPriceList,
  getPriceListByPackage,
  deleteCategory,
  deletePackage,
  deletePriceList,
} from "../controllers/packageController";
const router = express.Router();
// const packageController = require('../controllers/packageController');

router.post("/categories", createCategory);
router.get("/categories", getCategories);

router.post("/packages", createPackage);
router.get("/packages/:categoryId", getPackagesByCategory);

router.post("/pricelists", addPriceList);
router.get("/pricelists/:packageId", getPriceListByPackage);

router.delete("/categories/:id", deleteCategory);
router.delete("/packages/:id", deletePackage);
router.delete("/pricelists/:id", deletePriceList);

module.exports = router;
