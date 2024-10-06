const fs = require("fs");

//importing product schema
const model = require("../Model/product");
const Product = model.Product;

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); //    const products = await Product.find({price:{$gt:500}});

    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id); //  const product =await Product.findById(mongoose.isObjectIdOrHexString(id))

    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.replaceProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findOneAndDelete({ id: id });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json(err);
  }
};
