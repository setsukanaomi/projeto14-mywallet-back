import Joi from "joi";

export const transactionSchema = Joi.object({
  value: Joi.number().positive().required(),
  description: Joi.string().max(20).required(),
});
