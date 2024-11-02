import { Router } from "express";
import { checkUserExistence, loginUser, logoutUser, registerUser, whoAmI } from "../controllers/user/user.controller";
import { asyncHandler } from "../lib/asyncHandler";
import urlRouter from "../routes/url/url.routes";

const router = Router();

router.get('/who-am-i', asyncHandler(whoAmI))
router.get('/check-user-existence', asyncHandler(checkUserExistence))
router.post('/register', asyncHandler(registerUser))
router.post('/login', asyncHandler(loginUser))
router.delete('/logout', asyncHandler(logoutUser))

// router.use(asyncHandler(authHandler))

router.use('/url', asyncHandler(urlRouter))

export default router;