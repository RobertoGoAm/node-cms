import express from 'express';

import { authRoutes, coreRoutes } from './routes';

const app: express.Application = express();

// Routes
app.use('/', coreRoutes);
app.use('/auth', authRoutes);

export default app;
