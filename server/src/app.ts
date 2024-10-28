import express from 'express';
import cors from 'cors';
import rootRouter from './routes/index.routes';
import connectDB from './db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

console.log(process.env.PORT);

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Node Express!');
});

app.use("/api/v1/", rootRouter)

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});