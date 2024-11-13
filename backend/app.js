const express = require("express")
const blogRoute =require('./routes/blogPostRoutes')
const signupRoute=require('./routes/signup')
const bodyParser=require('body-parser')
// const createAdminAccount=require('./scripts/admin')
const loginRoute=require('./routes/login')
const app= express()
const cors=require("cors")
require("./connection/conn")
app.use(cors())
// createAdminAccount()
app.use(bodyParser.json())
app.use('/user',signupRoute)
app.use('/auth',loginRoute)
app.use(express.json())
app.use("/api/v1",blogRoute)
app.listen(1000,()=>{
    console.log('SERVER STARTED SUCCESSFULY ')
})