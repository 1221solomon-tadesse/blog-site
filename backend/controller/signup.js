const userModel=require("../models/userModel")
const bcrypt = require("bcryptjs");
 async function creatUser(req,res){
 const {data} = req.body
    const {name ,email ,password }=req.body
        const hashedPassword=await bcrypt.hash (password,10)
        const newUser=new userModel({
            name,
            email,
            password:hashedPassword,
            role:'user'
        })
        const savedUser=await newUser.save()
        console.log(savedUser)
        res.status(201).json({message: 'user created succesfully',user:savedUser})
        
    }

module.exports={creatUser}