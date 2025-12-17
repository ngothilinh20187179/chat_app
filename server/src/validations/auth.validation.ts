import Joi from "joi";
import { RegisterRequestBody, LoginRequestBody } from "../types/user";

const stringRequired = Joi.string().trim().required();

export const registerSchema = Joi.object<RegisterRequestBody>({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    fullname: Joi.string().max(100).optional()
}).messages({
    'string.empty': '{#label} cannot be an empty field',
    'any.required': '{#label} is a required field',
    'string.min': '{#label} must have a minimum length of {#limit}',
    'string.max': '{#label} must have a maximum length of {#limit}',
    'string.email': 'Please provide a valid email address'
});

export const loginSchema = Joi.object<LoginRequestBody>({
    usernameOrEmail: stringRequired,
    password: stringRequired
});