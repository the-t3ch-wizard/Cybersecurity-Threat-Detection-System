import { Router } from "express";
import { asyncHandler } from "../../lib/asyncHandler";
import { detectUrl, urlAnalysis } from "../../controllers/url/url.controller";

const router = Router()

router
  .route("/detect")
  .post(asyncHandler(detectUrl))

router
  .route("/analysis")
  .get(asyncHandler(urlAnalysis))

export default router;