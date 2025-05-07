import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import "./models";
import { setupSwagger } from './swagger';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/error-handler.middleware';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);
setupSwagger(app);

export default app;
