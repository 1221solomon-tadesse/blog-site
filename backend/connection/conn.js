const mongoose =  require("mongoose");
mongoose
  .connect(
    "mongodb+srv://solomontadesse480:soll12@cluster.gzsbx.mongodb.net/?retryWrites=true&w=majority&appName=cluster"
  )
  .then(() => console.log("connected"));
