import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/user';
import { LoginDto, RegisterDto } from '../dtos/auth-dto';
import { loginSchema, registerSchema } from '../schemas/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'jifioqahdiwaio!jdoi2123k1';

export const login = async (data: LoginDto) => {
  const { error } = loginSchema.validate(data);
  if (error) throw new Error(`Validation error: ${error.message}`);

  try {
    let user;
    if (data.email) {
      user = await userRepository.findUserByEmail(data.email);
    } else {
      user = await userRepository.findUserByFullname(data.username);
    }

    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ ...user }, JWT_SECRET, {
      expiresIn: '10h',
    });

    return token;
  } catch (error) {
    throw new Error(`Login failed: ${(error as Error).message}`);
  }
};

export const register = async (data: RegisterDto) => {
  const { error } = registerSchema.validate(data);
  if (error) throw new Error(`Validation error: ${error.message}`);

  try {
    const existingUser = await userRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await userRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    throw new Error(`Registration failed: ${(error as Error).message}`);
  }
};
