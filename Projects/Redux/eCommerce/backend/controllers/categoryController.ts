import asyncHandler from "../middlewares/asyncHandler";
import categoryModel from "../models/categoryModel";

const createCategory = asyncHandler(async (req: any, res: any) => {
  console.log(req.body);

  if (!req.body.name) {
    res.status(404).json({ message: "Category Name must be provided" });
    return;
  }

  const categoryName = req.body.name;

  const existingCategory = await categoryModel.findOne({ name: categoryName });
  if (existingCategory) {
    res.status(401).json({ message: "Category Already Exists" });
    return;
  }

  try {
    const category = await new categoryModel({ name: categoryName }).save();
    res.json(category);
  } catch (err) {
    res.status(401).json({ message: "Could not create new category" });
    return;
  }
});

const updateCategory = asyncHandler(async (req: any, res: any) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findOne({ _id: id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteCategory = asyncHandler(async (req: any, res: any) => {
  try {
    console.log(req.params);

    const removed = await categoryModel.findByIdAndDelete(req.params.id);
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getCategoryDetails = asyncHandler(async (req: any, res: any) => {
  try {
    const category = await categoryModel.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const listCategories = asyncHandler(async (req: any, res: any) => {
  try {
    const all = await categoryModel.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error ho gya" });
  }
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryDetails,
  listCategories,
};
