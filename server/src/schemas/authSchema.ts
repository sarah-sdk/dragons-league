import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "L'email doit être valide.",
    "string.empty": "L'email est requis.",
  }),
  password: Joi.string()
    .min(12)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/)
    .required()
    .messages({
      "string.min": "Le mot de passe doit contenir au moins 12 caractères.",
      "string.pattern.base":
        "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial.",
      "string.empty": "Le mot de passe est requis.",
    }),
  isAdmin: Joi.boolean().optional().default(false),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "L'email doit être valide.",
    "string.empty": "L'email est requis.",
  }),
  password: Joi.string()
    .min(12)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/)
    .required()
    .messages({
      "string.min": "Le mot de passe doit contenir au moins 12 caractères.",
      "string.pattern.base":
        "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial.",
      "string.empty": "Le mot de passe est requis.",
    }),
});
