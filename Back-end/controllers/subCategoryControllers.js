import SubCategory from "../models/subCategoryModel.js";
import Category from "../models/categoryModel.js";
class Controller {
  // create a new subCategory
  createCategory = async (req, res) => {
    try {
      const { name } = req.body;

      const category = await Category.findById(req.body.category);
      console.log(category);
      if (!category) {
        return res.status(404).json({ message: "category not found" });
      }

      const subCategory = await SubCategory.create({
        name: name,
        category: category._id,
      });

      return res.status(201).json({ subCategory });
    } catch (err) {
      return res.status(400).send(err.message);
    }
  };

  // Get all subcategories
  getAllSubCategories = async (req, res) => {
    try {
      const subCategories = await SubCategory.find();
      res.status(200).json(subCategories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // Get subCategory by id
  getSubCategoryById = async (req, res) => {
    try {
      const subCategory = await SubCategory.findById(req.params.id);
      if (!subCategory) {
        return res.status(404).json({ message: "subCategory not found." });
      }
      res.status(200).json(subCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update subCategory by id

  updateSubCategoryById = async (req, res, next) => {
    let { id } = req.params;
    console.log(id);
    try {
      const subCategory = await SubCategory.findById(req.params.id);
      console.log(req.params.id);
      const response = await SubCategory.findOneAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).send({ success: true, response });
    } catch (error) {
      return next(error);
    }
  };

  // Delete  subCategory by Id

  deleteSubCategoryById = async (req, res) => {
    try {
      const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
      if (!subCategory) {
        return res.status(404).json({ message: "subCategory not found" });
      }
      res.json({ message: "subCategory deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

const controller = new Controller();
export default controller;