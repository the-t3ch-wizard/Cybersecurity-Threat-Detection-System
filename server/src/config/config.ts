import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI = String(process.env.MONGO_URI) || '';
export const JWT_SECRET = String(process.env.JWT_SECRET) || '';
export const PORT = String(process.env.PORT) || '3000';
export const VIRUS_TOTAL_APIKEY = String(process.env.VIRUS_TOTAL_APIKEY) || '';
