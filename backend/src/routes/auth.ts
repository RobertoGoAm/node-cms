import express, { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';

import { ILoginData } from '../models/dto/loginData.dto';
import { IRegisterData } from '../models/dto/registerData.dto';
import { User } from '../models/User';

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

router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password }: IRegisterData = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: 'Must provide name, email and password.' })
      .end();
  }

  let user = await User.findOne({ email: email });

  if (user) {
    return res
      .status(400)
      .json({ error: 'Email provided is already registered' });
  }

  return res.status(201).json({ message: 'Hello World' }).end();
});

export const authRoutes = router;
