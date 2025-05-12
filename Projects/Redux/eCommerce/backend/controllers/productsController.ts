import asyncHandler from "../middlewares/asyncHandler";
import Product from "../models/productModel";

const createProduct = asyncHandler(async (req: any, res: any) => {
  try {
    const { name, description, price, category, quantity, brand, image } =
      req.fields;

    switch (true) {
      case !name:
        res.status(404).json({ message: "Product name is required" });
        return;
      case !description:
        res.status(404).json({ message: "Product description is required" });
        return;
      case !price:
        res.status(404).json({ message: "Product price is required" });
        return;
      case !category:
        res.status(404).json({ message: "Product category is required" });
        return;
      case !quantity:
        res.status(404).json({ message: "Product quantity is required" });
        return;
      case !brand:
        res.status(404).json({ message: "Product brand is required" });
        return;
      case !brand:
        res.status(404).json({ message: "Product brand is required" });
        return;
    }

    const newProduct = new Product({ ...req.fields });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error Occured Creating Product" });
  }
});

const updateProduct = asyncHandler(async (req: any, res: any) => {
  try {
    const productId = req.params.id;

    const { name, description, price, category, quantity, brand, image } =
      req.fields;

    switch (true) {
      case !name:
        res.status(404).json({ message: "Product name is required" });
        return;
      case !description:
        res.status(404).json({ message: "Product description is required" });
        return;
      case !price:
        res.status(404).json({ message: "Product price is required" });
        return;
      case !category:
        res.status(404).json({ message: "Product category is required" });
        return;
      case !quantity:
        res.status(404).json({ message: "Product quantity is required" });
        return;
      case !brand:
        res.status(404).json({ message: "Product brand is required" });
        return;
      case !brand:
        res.status(404).json({ message: "Product brand is required" });
        return;
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { ...req.fields },
      { new: true }
    );

    await product?.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error Occured Creating Product" });
  }
});

const deleteProduct = asyncHandler(async (req: any, res: any) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const fetchProductById = asyncHandler(async (req: any, res: any) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Product not found" });
  }
});

const fetchProducts = asyncHandler(async (req: any, res: any) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const fetchAllProduct = asyncHandler(async (req: any, res: any) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const fetchTopProducts = asyncHandler(async (req: any, res: any) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server Error" });
  }
});

const fetchNewProducts = asyncHandler(async (req: any, res: any) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server Error" });
  }
});

const addProductReview = asyncHandler(async (req: any, res: any) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r!.user!.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400).json({ message: "Product already reviewed" });
        return;
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item!.rating! + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404).json({ message: "Product not found" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server Error" });
  }
});

export {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductById,
  fetchProducts,
  fetchAllProduct,
  fetchTopProducts,
  fetchNewProducts,
  addProductReview,
};
