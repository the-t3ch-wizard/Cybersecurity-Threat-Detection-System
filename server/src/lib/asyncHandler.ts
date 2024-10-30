import { response } from "./response";


export const asyncHandler = (fn: Function) => async (req: any, res: any, next: any) => {
  try {
    await fn(req, res, next)
  } catch (error: any) {
    return res.status(error.statusCode || 500).json(response(null, error.message || "Something went wrong!"))
  }
}