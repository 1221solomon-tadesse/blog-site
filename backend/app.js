const express = require("express")
const blogRoute =require('./routes/blogPostRoutes')
const signupRoute=require('./routes/signup')
const bodyParser=require('body-parser')
const loginRoute=require('./routes/login')
const cors=require("cors")
const app= express()
require("./connection/conn")

app.use(
  cors({
    origin: "https://blog-site-frontend-2.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use((cors))
app.use(bodyParser.json())
app.use('/user',signupRoute)
app.use('/auth',loginRoute)
app.use(express.json())
app.use("/api/v1",blogRoute)
app.listen(1000,()=>{
    console.log('SERVER STARTED SUCCESSFULY ')
})
app.get("/", (req, res) => {
  res.send("Backend server is running successfully!");
});