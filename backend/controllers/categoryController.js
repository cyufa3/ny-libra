import Category from "../models/Category.js";

// GET all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ADD category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ message: "Category name is required" });

    const exists = await Category.findOne({ name });
    if (exists)
      return res.status(400).json({ message: "Category already exists" });

    const category = new Category({ name });
    await category.save();

    res.json({ message: "Category created", category });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
