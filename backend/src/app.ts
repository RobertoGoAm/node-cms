import express from 'express';
import mongoose from 'mongoose';
import { DB_HOST, DB_NAME, DB_PORT } from './config/config';

import { authRoutes, coreRoutes } from './routes';

const app: express.Application = express();

// Routes
app.use('/', coreRoutes);
app.use('/auth', authRoutes);

// DB
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default app;
