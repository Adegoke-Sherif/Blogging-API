import Jwt from "jsonwebtoken";
import User from "../database/user.schema.js";
import { ErrorWithStatus } from "../exceptions/error-with-status-exception.js"
import bcrypt from "bcrypt";


export const login = async (email, password) => {
  //check if email exist
  const user = await User.findOne({ email });
  if(!user) {
    throw new ErrorWithStatus("User not found", 404);
  }
  //check if password is not correct 
  if(!(bcrypt.compareSync(password, user.password))) {
    throw new ErrorWithStatus("USername or Password is incorrect", 400)
  }
  //Generate access Token
  const JWT_SECRET = process.env.JWT_SECRET || "secret";
  const token = Jwt.sign({ 
    role: user.role || "USER",
    email: user.email, 
    _id: user._id,
    sub: user._id, 
    password: user.password },JWT_SECRET, {
    expiresIn: "1h",
  })

  return token 
}

export const signUp = async (first_name, last_name, email, password, role) => {
  //check if email exists
  const user = await User.findOne({ email });
  if(user) {
    throw new ErrorWithStatus("User already exists", 404);
  }
  //Create New User
  password = await bcrypt.hash(password, 10)
  const newUser = new User({ 
    first_name,
    last_name,
    email,
    password,
    role,
  });
  await newUser.save();

  delete newUser.password;
  return newUser;
}