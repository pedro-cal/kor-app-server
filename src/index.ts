import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mainRouter from './routes';
import dbConnect from './config/dbConnect';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env',
  );
}

dbConnect(MONGODB_URI)
  .then(() => {
    app.use(express.json());
    app.use(
      cors({
        origin: 'http://localhost:5173',
      }),
    );
    app.use('/api', mainRouter);

    app.listen(PORT, () =>
      console.log(`Server up! Listening at http://localhost:${PORT}`),
    );
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });
