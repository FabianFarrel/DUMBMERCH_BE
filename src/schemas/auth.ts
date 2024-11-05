import Joi from 'joi';

export const loginSchema = Joi.object({
  fullname: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().required(),
}).xor('fullname', 'email'); 

export const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
