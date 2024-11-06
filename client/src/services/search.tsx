import { customAxios } from "../lib/axiosInstance"

export const analyzeContent = async (content: string) => {
  try {
    const {data} = await customAxios.post("/content/analyze", {
      content
    })
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
