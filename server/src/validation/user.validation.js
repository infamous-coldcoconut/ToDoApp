import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(3).max(10).required(),
});

export { createUserSchema };
