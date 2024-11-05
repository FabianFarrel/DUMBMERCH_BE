import { NextFunction, Request, Response } from 'express';
import * as authServices from '../services/authService';
import { LoginDto, RegisterDto } from '../dtos/auth-dto';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const dataUserForLogin = req.body as LoginDto;
    const token = await authServices.login(dataUserForLogin);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const bodyRegister = req.body as RegisterDto;
    const user = await authServices.register(bodyRegister);
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};
