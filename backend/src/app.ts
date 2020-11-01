import express from 'express';
import mongoose from 'mongoose';
import { MONGO_URL } from './config/config';

import { authRoutes, coreRoutes } from './routes';

const app: express.Application = express();

// Routes
app.use('/', coreRoutes);
app.use('/auth', authRoutes);

// DB
mongoose.connect(MONGO_URL || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default app;
