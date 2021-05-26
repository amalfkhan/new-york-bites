// check that user entry when registering for or logging into account follows data standards
import Joi from "@hapi/joi";

export const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    username: Joi.string().required().min(8),
    password: Joi.string().min(8).required(),
    verifyPassword: Joi.string().min(8).required()
  });
  return schema.validate(data);
}

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required()
  });

  return schema.validate(data);
}