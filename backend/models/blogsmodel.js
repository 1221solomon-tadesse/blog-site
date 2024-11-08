const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  blogname: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = new mongoose.model("blogs", bookSchema);
 