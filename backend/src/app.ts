import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import routes from './routes';
import { setupSwagger } from './swagger';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api', routes);
setupSwagger(app);

export default app;
