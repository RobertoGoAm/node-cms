import express from 'express';
import mongoose from 'mongoose';
import { MONGO_URL } from './config/config';

import { authRoutes, coreRoutes } from './routes';

// DB
mongoose.connect(MONGO_URL || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

export const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected:', MONGO_URL);
});
db.on('error', (err) => {
  console.error('connection error:', err);
});

// API
const app: express.Application = express();

// Routes
app.use('/', coreRoutes);
app.use('/auth', authRoutes);

export default app;
