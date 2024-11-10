const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://solomontadesse480:soll@soll.is9ec.mongodb.net/blog?retryWrites=true&w=majority&appName=soll"
  )
  .then(() => console.log("connected"));
