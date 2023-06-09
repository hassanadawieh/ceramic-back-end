import Product from "../models/productModel.js";
import fs from "fs";
import SubCategory from "../models/subCategoryModel.js";
// import uploadImage from "../middleware/image.js";

export async function getAll(req, res, next) {
  try {
  const { page, limit } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Paginate items using mongoose-paginate-v2
    const options = {
      page: pageNumber || 1,
      limit: limitNumber || 8,
    };

    const items = await Product.paginate({}, options);

    return res.status(200).json({
      items: items.docs,
      totalPages: items.totalPages,
      currentPage: items.page,
      limit: items.limit,
      totalItems: items.totalDocs,
    });
  } catch (err) {
    next(err);
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error getting Product by ID: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
}

//add product
export async function post(req, res, next) {
  try {
    const { name, description, image, price , quantity} = req.body;

    const subCategory = await SubCategory.findById(req.body.subCategory);
    console.log(subCategory);
    if (!subCategory) {
      return res.status(404).json({ message: "subCategory not found" });
    }

    const product = await Product.create({
      name: name,
      description: description,
      image: image,
      subCategory: subCategory._id,
      price: price,
      quantity: quantity,
    });

    return res.status(201).json({ product });
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

export async function put(req, res, next) {
  let { id } = req.params;
  try {
    const oldProduct = await Product.findById(req.params.id);
    console.log(req.body.image);
    !req.body.image ? null : fs.unlinkSync(oldProduct.image);
    const response = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send({ success: true, response });
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

// delete product
export async function deleteOne(req, res, next) {
  let { id } = req.params;
  try {
    const oldProduct = await Product.findById(req.params.id);
    if (!oldProduct) {
      return res.status(409).send({ message: "Product does not exists" });
    }
    !oldProduct.image ? null : fs.unlinkSync(oldProduct.image);
    const response = await Product.findOneAndDelete({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send({
      success: true,
      response,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

const controller = {
  getAll,
  post,
  getProductById,
  put,
  deleteOne,
};

export default controller;
