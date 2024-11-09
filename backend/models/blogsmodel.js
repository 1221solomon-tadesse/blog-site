const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  blogname: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", 
    required: true,
  },
});
module.exports = new mongoose.model("blogs", bookSchema);
 