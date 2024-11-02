import { compare } from "bcrypt";
import jwt from 'jsonwebtoken';
import { response } from "../../lib/response";
import { User } from "../../models/user.model";
import { JWT_SECRET } from "../../config/config";

export const whoAmI = async (req: any, res: any) => {
  // logger

  const token = req.cookies.authToken;

  const isValid : any = jwt.verify(token, JWT_SECRET)

  if (!isValid){
    return res.status(401).json(response(null, "Token is not valid!"));
  }

  const userId = isValid.userId
  
  const user = User.findOne({
    _id: userId
  })
  if (!user){
    return res.status(404).json(response(null, "User not found!"));
  }
  
  return res.status(200).json(response(isValid, "User found!"));
}

export const checkUserExistence = async (req: any, res: any) => {
  // logger.info("Check user existence")

  const {
    email
  } = req.query;

  const userExistence = await User.findOne({
    email
  }).select('email')
  if (!userExistence){
    return res.status(404).json(response(null, "User not found!"));
  }

  return res.status(200).json(response(userExistence, "User found!"));
}

export const registerUser = async (req: any, res: any) => {
  // logger
  
  const {
    name,
    email,
    password,
  } = req.body;

  const registeredUser = await User.create({
    name,
    email,
    password,
  })
  if (registeredUser){
    return res.status(200).json(response(registeredUser, "User registered successfully!"))
  }

  return res.status(500).json(response(null, "Unable to register user!"))
}

export const loginUser = async (req : any, res : any) => {
  // logger.info("Login")

  const {
    email,
    password,
  } = req.body;

  const existingUser = await User.findOne({
    email,
    // password,
  })
  if (!existingUser){
    return res.status(404).json(response(null, "User not found!"))
  }

  const isMatch = await compare(password, existingUser.password)
  if (!isMatch){
    return res.status(401).json(response(null, "Invalid login credentials!"))
  }

  const token = jwt.sign({
    userId: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
  }, JWT_SECRET)

  res.cookie('authToken', token, {
    // httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
    // secure: process.env.NODE_ENV === 'production', // Ensures cookie is only sent over HTTPS
    // maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    // sameSite: 'Strict', // Cookie sent only on the same site
  })

  return res.status(200).json(response(null, "User logged in successfully!"))
}

export const logoutUser = async (req : any, res : any) => {
  // logger.info("Login")

  res.clearCookie('authToken')

  return res.status(200).json(response(null, "User logged out successfully!"))
}
