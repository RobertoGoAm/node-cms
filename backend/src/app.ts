import express from 'express';
import httpRouter from './router';

const app: express.Application = express();

httpRouter(app);

const myApp: express.Application = app;

export default myApp;
