require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const productRouter = require("./routes/productRoute.js");
const userRouter = require("./routes/userRoute.js");
const authRouter = require("./routes/authRoute.js");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "./public.key"),
  "utf-8"
);

const server = express();

const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    const decode = jwt.verify(token, publicKey);
    if (decode) {
      console.log(decode);
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(401);
  }
};

//Middlewares
server.use(morgan("short"));
server.use(express.static("public"));
server.use(express.json());

//Routes
server.use("/auth", authRouter.route);
server.use("/products", auth, productRouter.route);
server.use("/users", auth, userRouter.route);

server.listen(8000, () => {});
