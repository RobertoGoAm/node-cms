import express, { Request, Response } from 'express';

import { ILoginData } from 'src/models/dto/loginData.dto';

const router = express.Router();
router.use(express.json());

router.post('/login', (req: Request, res: Response) => {
  const { email, password }: ILoginData = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'You must provide email and password.' })
      .end();
  }

  res.json({ message: 'Hello World' });
});

export const authRoutes = router;
