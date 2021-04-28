const services = require('../services/users');
const validate = require('../utils/JoiVerify/joiValidate');

module.exports = {
  async createUser(req, res, next) {
    try {
      const user = validate.validateUserCreate(req.body);
      if (user.failed) {
        next(user);
      }
      response = await services.createUser(user);
      response.failed
        ? next(response)
        : res.status(201).json({
            message: 'El usuario se creo con éxito',
            data: response,
          });
    } catch (err) {
      next({
        status: 400,
        message: err.toString(),
      });
    }
  },
};
