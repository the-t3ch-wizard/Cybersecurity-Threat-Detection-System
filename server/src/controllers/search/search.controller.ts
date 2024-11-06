import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { response } from "../../lib/response";
import { GOOGLE_GENAI_API_KEY } from '../../config/config';

export const contentAnalysis = async (req: any, res: any) => {
  const {
    content
  } = req.body;

  const genAI = new GoogleGenerativeAI(GOOGLE_GENAI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You provide help regarding Text-Based Phishing Detection and Social Engineering Techniques. You need to Analyze communications for manipulative language or unusual requests for access. You also need to detect emails, PDFs, or scripts that are suspicious or match phishing-like language patterns."
  });

  const result = await model.generateContent({
    contents: [{
      role: 'user',
      parts: [
        {
          text: content
        }
      ]
    }],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.1,
    },
  });
  const responseText = result.response.text();

  return res.status(200).json(response(responseText, "Analysis of url is provided successfully!"))
}
