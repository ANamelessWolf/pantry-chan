import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes';
import "./models";
import { setupSwagger } from './swagger';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/error-handler.middleware';

dotenv.config();
connectDB();

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Handle preflight OPTIONS for all routes before anything else
app.options('/{*path}', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use('/media', express.static(path.join(process.cwd(), 'media')));
app.use('/api', routes);
app.use(errorHandler);
setupSwagger(app);

export default app;
