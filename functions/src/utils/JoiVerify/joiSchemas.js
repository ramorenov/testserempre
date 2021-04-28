const Joi = require('@hapi/joi');

module.exports = {
  userCreate: Joi.object({
    name: Joi.string().required().label('Ingrese un nombre de usuario válido'),
    email: Joi.string().email({ minDomainSegments: 2 }).required().label('Ingrese un usuario válido'),
    password: Joi.string().min(6).max(30).required().label('La contraseña debe tener minimo 6 caracteres y maximo 30'),
  }),

  userUpdate: Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2 }).required().label('Ingrese un nombre de usuario válido'),
    password: Joi.string().min(6).max(30).label('La contraseña debe tener minimo 6 caracteres y maximo 30'),
  }),
};
