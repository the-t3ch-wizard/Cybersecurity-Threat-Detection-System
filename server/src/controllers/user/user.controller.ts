import { response } from "../../lib/response";
import { User } from "../../models/user.model";

export const checkUserExistence = async (req: any, res: any) => {
  // logger.info("Check user existence")

  const {
    email
  } = req.query;

  const userExistence = await User.findOne({
    email
  }).select('email')
  if (userExistence){
    return res.status(200).json(response(true, userExistence, "User found!"));
  }

  return res.status(404).json(response(false, null, "User not found!"));
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
    return res.status(200).json(response(true, registeredUser, "User registered successfully!"))
  }

  return res.status(500).json(response(false, null, "Unable to register user!"))
}

export const loginUser = async (req : any, res : any) => {
  // logger.info("Login")

  // const {
  //   email,
  //   password,
  // } = req.body;

  // const existingUser = await User.findOne({
  //   email,
  // })
  // if (!existingUser){
  //   return res.status(200).json(response(false, existingUser, "User registered successfully!"))
  // }

  // return res.status(500).json(response(false, null, "Unable to register user!"))
}
