const Category = require("../models/category.model");

const createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    //validation
    if (!name || !slug) {
      return res.status(400).json({
        message: "Incomplete details",
        success: false,
      });
    }

    //check existing Category
    const existingCategory = await Category.findOne({
      $or: [{ name }, { slug }],
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
        success: false,
      });
    }

    //create Category
    const newCategory = await Category.create({
      name,
      slug,
      description,
    });

    //response
    return res.status(201).json({
      message: "Category created successfully",
      success: true,
      newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryById = await Category.findById(req.params.id);

    if (!categoryById) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    //response
    return res.status(200).json({
      categoryById,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//update category
const updateCategory = async (req, res) => {
  try {
    const { name, slug, description, isActive } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, description, isActive },
      { new: true, runValidators: true },
    );

    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "category updated successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
