const Product = require("../models/product.model");
const Category = require("../models/category.model");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, images, stock, category } = req.body;

    //validate
    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        message: "name, description, price and category are required.",
        success: false,
      });
    }
    //check category exist
    const categoryExist = await Category.findById(category);
    if (!categoryExist) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      images,
      stock,
      category,
    });

    return res.status(201).json({
      message: "Product created successfully",
      success: true,
      newProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//Get all Product

const getAllProduct = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    const allProduct = await Product.find(filter);

    return res.status(200).json({
      allProduct,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//get product by id
const getProductById = async (req, res) => {
  try {
    const getProduct = await Product.findById(req.params.id);

    if (!getProduct) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    return res.status(200).json({
      getProduct,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Intenal server error",
      success: false,
      error: error.message,
    });
  }
};

//update product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, images, stock, category } = req.body;

    if (category) {
      const categoryExist = await Category.findById(category);

      if (!categoryExist) {
        return res.status(404).json({
          message: "Category not found",
          success: false,
        });
      }
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, images, stock, category },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      success: true,
      updatedProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    const productDeleted = await Product.findByIdAndDelete(req.params.id);

    if (!productDeleted) {
      return res
        .status(404)
        .json({ message: "Product not deleted", success: false });
    }

    return res
      .status(200)
      .json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
