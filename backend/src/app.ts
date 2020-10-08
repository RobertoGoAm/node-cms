import express from 'express';
import { authRoutes, coreRoutes } from './routes';
import cors from 'cors';

const app: express.Application = express();

// Routes
app.use('/', coreRoutes);
app.use('/auth', authRoutes);

// Middleware
app.use(cors());

export default app;
