import Joi from "joi";

const createShoppingListSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(30).required(),
  owner: Joi.string()
    .regex(/^[a-f\d]{24}$/i)
    .required(),
  memberList: Joi.array().items(Joi.string().regex(/^[a-f\d]{24}$/i)),
  itemList: Joi.array().items(
    Joi.object({
      name: Joi.string().min(1).required(),
      resolved: Joi.boolean(),
    })
  ),

  isActive: Joi.boolean().default(true),
});

const updateShoppingListSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(30).required(),
  owner: Joi.string()
    .regex(/^[a-f\d]{24}$/i)
    .required(),
  memberList: Joi.array().items(Joi.string().regex(/^[a-f\d]{24}$/i)),
  itemList: Joi.array().items(
    Joi.object({
      name: Joi.string().min(1).required(),
      resolved: Joi.boolean(),
    })
  ),

  isActive: Joi.boolean().default(true),
});

export { createShoppingListSchema, updateShoppingListSchema };
