const model = require("../model/productModel");
const Product = model.Product;

exports.getAll = async (req, res) => {
  const query = Product.find();

  if (req.query) {
    const doc = await query
      .sort({ [req.query.field]: req.query.order })
      .limit(req.query.limit)
      .exec();
    res.json(doc);
  } else {
    const doc = await query.sort().exec();
    res.json(doc);
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json(product);
};

exports.create = async (req, res) => {
  const product = new Product(req.body);
  await product.save().then((err, doc) => {
    res.status(201).json(req.body);
  });
};

exports.replaceById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndDelete({ _id: id });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
