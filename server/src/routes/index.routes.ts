import { Router } from "express";
import { checkUserExistence, loginUser, logoutUser, registerUser } from "../controllers/user/user.controller";
import { asyncHandler } from "../lib/asyncHandler";

const router = Router();

// router.get('/who-am-i', )
router.get('/check-user-existence', asyncHandler(checkUserExistence))
router.post('/register', asyncHandler(registerUser))
router.post('/login', asyncHandler(loginUser))
router.delete('/logout', asyncHandler(logoutUser))

export default router;