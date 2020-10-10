import express, { Request, Response } from 'express';
import cors from 'cors';

const router = express.Router();
router.use(express.json());
router.use(cors());

router.get('/', (req: Request, res: Response) =>
  res.json({ message: 'Hello World' })
);

export const coreRoutes = router;
