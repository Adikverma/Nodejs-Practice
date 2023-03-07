const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("db connected");
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, Required: true },

  lastName: String,

  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, "User email is required"],
  },

  phone: {
    type: String,
    // validate: {
    //   validator: function (v) {
    //     return /\d{3}-\d{3}-\d{4}/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid phone number!`,
    // },
    required: [true, "User phone number required"],
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  token: String,
});

exports.User = mongoose.model("User", userSchema);
