import { customAxios } from "../lib/axiosInstance"

export const getServerStatus = async () => {
  const {data} = await customAxios.get("/server-status")
  return data;
}
