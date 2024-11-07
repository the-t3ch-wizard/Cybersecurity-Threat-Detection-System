import { Router } from "express";
import { checkUserExistence, loginUser, logoutUser, registerUser, whoAmI } from "../controllers/user/user.controller";
import { asyncHandler } from "../lib/asyncHandler";
import urlRouter from "../routes/url/url.routes";
import fileRouter from "../routes/file/file.routes";
import searchRouter from "../routes/search/search.routes";
import { response } from "../lib/response";

const router = Router();

router.get('/server-status', (req, res) => {
  res.status(200).json(response(true, "The running status of server is great!"));
})

router.get('/who-am-i', asyncHandler(whoAmI))
router.get('/check-user-existence', asyncHandler(checkUserExistence))
router.post('/register', asyncHandler(registerUser))
router.post('/login', asyncHandler(loginUser))
router.delete('/logout', asyncHandler(logoutUser))

// router.use(asyncHandler(authHandler))

router.use('/url', asyncHandler(urlRouter))
router.use('/file', asyncHandler(fileRouter))
router.use('/content', asyncHandler(searchRouter))

export default router;