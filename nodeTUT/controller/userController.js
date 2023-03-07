const model = require("../model/userModel");
const User = model.User;

exports.getAll = async (req, res) => {
  const user = await User.find();
  res.json(user);
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.json(user);
};

exports.replaceById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndDelete({ _id: id });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
