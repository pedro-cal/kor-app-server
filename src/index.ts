import dotenv from 'dotenv';
import express from 'express';
import mainRouter from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use('/api', mainRouter);

app.listen(PORT, () => console.log(`Server up! Listening at http://localhost:${PORT}`));
