import { customAxios } from "../lib/axiosInstance"

export const detectFile = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
  
    const {data} = await customAxios.post("/file/detect", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 60000,
    })
  
    return data;
  } catch (error) {
    console.log(error);
    throw error?.response?.data;
  }
}

export const fileAnalysis = async (url: any) => {
  const {data} = await customAxios.get("/file/analysis?url="+url)
  return data;
}
