const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const model = require("../model/userModel");
const User = model.User;
const fs = require("fs");
const path = require("path");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

exports.signup = async (req, res) => {
  const token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  const hash = bcrypt.hashSync(req.body.password, 5);

  const user = new User(req.body);
  user.token = token;
  user.password = hash;

  await user
    .save()
    .then((err, doc) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(400).send("Email already Exists");
    });
};

exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      const token = jwt.sign({ email: req.body.email }, privateKey, {
        algorithm: "RS256",
      });
      doc.token = token;
      await doc.save().then((err, doc) => {
        res.status(201).json({ token });
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(401).send(err);
  }
};
