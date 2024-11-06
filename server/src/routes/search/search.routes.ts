import { Router } from "express";
import { asyncHandler } from "../../lib/asyncHandler";
import { contentAnalysis } from "../../controllers/search/search.controller";

const router = Router()

router
  .route("/analyze")
  .post(asyncHandler(contentAnalysis))

export default router;