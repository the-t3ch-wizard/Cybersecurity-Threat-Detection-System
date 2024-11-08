import axios from 'axios';
import FormData from 'form-data';
import { VIRUS_TOTAL_APIKEY } from "../../config/config";
import { response } from "../../lib/response";

export const detectFile = async (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const formData = new FormData();
  formData.append("file", req.file.buffer, req.file.originalname);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.virustotal.com/api/v3/files',
    headers: { 
      'accept': 'application/json', 
      'x-apikey': VIRUS_TOTAL_APIKEY,
      ...formData.getHeaders(),
    },
    data: formData,
    timeout: 60000,
  };

  const urlDetectionResponse = await axios.request(config);
  
  const analysisLink = urlDetectionResponse?.data?.data?.links?.self

  return res.status(200).json(response(analysisLink, "Threat of file is being detected!"))
}

export const fileAnalysis = async (req: any, res: any) => {
  const {
    url
  } = req.query;

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      'x-apikey': VIRUS_TOTAL_APIKEY
    },
  };
  // console.log('config', config);
  const urlAnalysisResponse = await axios.request(config);

  const attributes = urlAnalysisResponse?.data?.data?.attributes;

  return res.status(200).json(response(attributes, "Analysis of file is provided successfully!"))
}
