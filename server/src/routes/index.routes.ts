import { Router } from "express";
import { checkUserExistence, loginUser, registerUser } from "../controllers/user/user.controller";

const router = Router();

// router.get('/who-am-i', )
router.get('/check-user-existence', checkUserExistence)
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router;