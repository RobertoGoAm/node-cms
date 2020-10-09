import express from 'express';
import cors from 'cors';

import { authRoutes, coreRoutes } from './routes';

const app: express.Application = express();

// Routes
app.use('/', coreRoutes);
app.use('/auth', authRoutes);

// Middleware
app.use(cors());

export default app;
