import { Router } from "express";
import multer from 'multer';
import { asyncHandler } from "../../lib/asyncHandler";
import { detectFile, fileAnalysis } from "../../controllers/file/file.controller";

const router = Router()
const upload = multer();

router
  .route("/detect")
  .post(upload.single("file"), asyncHandler(detectFile))

router
  .route("/analysis")
  .get(asyncHandler(fileAnalysis))

export default router;