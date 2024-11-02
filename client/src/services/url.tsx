import { customAxios } from "../lib/axiosInstance"

export const detectUrl = async (url: string) => {
  const {data} = await customAxios.post("/url/detect", {
    url
  })
  return data;
}

export const urlAnalysis = async (url: string) => {
  const {data} = await customAxios.get("/url/analysis?url="+url)
  return data;
}
