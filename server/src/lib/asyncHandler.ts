import { response } from "./response";

export const asyncHandler = (fn: Function) => async (req: any, res: any, next: any) => {
  try {
    await fn(req, res, next)
  } catch (error: any) {
    console.log(error)
    return res.status(error?.response?.status || error?.statusCode || 500).json(response(null, error?.response?.statusText || error?.message || "Something went wrong!"))
  }
}
