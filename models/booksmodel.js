const mongoose = require("mongoose");

const booksmodel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [3, "Title should be atleast 3 character long"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"author",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    published: {
      type: String,
    },
    price: {
      type: String,
    },
    royalty: {
      type: String,
    },
  },
  { timestamps: true }
);

const allbooks = mongoose.model("books", booksmodel);
module.exports = allbooks;
