import express, { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';

import { ILoginData } from 'src/models/dto/loginData.dto';

const router = express.Router();
router.use(express.json());
router.use(cors());

router.post('/login', (req: Request, res: Response) => {
  const { email, password }: ILoginData = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'Must provide both email and password.' })
      .end();
  }

  return res.status(200).json({ message: 'Hello World' }).end();
});

router.post('/register', (req: Request, res: Response) => {
  return res.status(201).json({ message: 'Hello World' }).end();
});

export const authRoutes = router;
