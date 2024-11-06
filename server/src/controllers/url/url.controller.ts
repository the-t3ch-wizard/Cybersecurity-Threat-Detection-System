import axios from 'axios';
import { VIRUS_TOTAL_APIKEY } from "../../config/config";
import { response } from "../../lib/response";

export const detectUrl = async (req: any, res: any) => {

  const {
    url
  } = req.body;

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.virustotal.com/api/v3/urls',
    headers: { 
      'accept': 'application/json', 
      'content-type': 'application/x-www-form-urlencoded', 
      'x-apikey': VIRUS_TOTAL_APIKEY
    },
    data: {
      'url': url
    }
  };
  console.log('config', config);
  const urlDetectionResponse = await axios.request(config);

  const analysisLink = urlDetectionResponse?.data?.data?.links?.self

  return res.status(200).json(response(analysisLink, "Threat of url is being detected!"))
}

export const urlAnalysis = async (req: any, res: any) => {

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
  
  // console.log('urlAnalysisResponse', urlAnalysisResponse?.data?.data?.attributes?.status);

  // urlAnalysisResponse?.data?.data?.attributes?.results -> list of checks -> key.category 
  // urlAnalysisResponse?.data?.data?.attributes?.stats -> mal, sus, undetect, timeout, harmless

  return res.status(200).json(response(attributes, "Analysis of url is provided successfully!"))
}
