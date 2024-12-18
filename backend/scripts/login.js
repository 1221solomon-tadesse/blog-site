const bcrypt = require("bcryptjs");
const userModel = require('../models/userModel');
const { GenerateToken } = require('../utils/jwtUtils');

async function login(email, password) {
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      throw new Error('User not found!');
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }

    const token = GenerateToken(existingUser);
    return { token, user: existingUser }; 
  } catch (error) {
    console.error('Login Error:', error); 
    throw error;
  }
}

module.exports = { login };
