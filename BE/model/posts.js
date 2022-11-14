let mongoose = require("mongoose");
const { connectDb } = require("../config/db");

let postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

let mydb = mongoose.connection.useDb("vjUniverse");
module.exports = mydb.model("posts", postSchema);
