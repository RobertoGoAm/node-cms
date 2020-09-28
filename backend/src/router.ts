import { Application, Request, Response, Router } from 'express';

const router = (app: Application) => {
  const apiRouter: Router = Router();

  apiRouter.get('/', (req: Request, res: Response) =>
    res.status(200).json({ message: 'Testing' })
  );

  app.use('/api/v1', apiRouter);
};

export default router;
