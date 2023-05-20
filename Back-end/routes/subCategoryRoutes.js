import express from "express";
import controller from "../controllers/subCategoryControllers.js";
const router = express.Router();

router.get("/", controller.getAllSubCategories);
router.post("/", controller.createCategory);
router.delete("/:id",
controller.deleteSubCategoryById,
);
router.get("/:id" , controller.getSubCategoryById);
router.purge("/:id", controller.updateSubCategoryById);
export default router;

