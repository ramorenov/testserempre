const services = require('../services/users');
const validate = require('../utils/JoiVerify/joiValidate');

module.exports = {
  async createUser(req, res, next) {
    try {
      const user = validate.validateUserCreate(req.body);
      if (user.failed) {
        next(user);
        return;
      }
      response = await services.createUser(user);
      return response.failed
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
      return;
    }
  },

  async getUsers(req, res, next) {
    try {
      response = await services.getUsers();
      return response.failed ? next(response) : res.status(200).json(response);
    } catch (err) {
      next({
        status: 400,
        message: err.toString(),
      });
      return;
    }
  },

  async getUserById(req, res, next) {
    try {
      const id = req.params.id;
      response = await services.getUserById(id);
      return response.failed ? next(response) : res.status(200).json(response);
    } catch (err) {
      next({
        status: 400,
        message: err.toString(),
      });
      return;
    }
  },

  async updateUserById(req, res, next) {
    try {
      const id = req.params.id;
      const user = validate.validateUserUpdate(req.body);
      if (user.failed) {
        next(user);
        return;
      }
      response = await services.updateUserById(id, user);
      return response.failed
        ? next(response)
        : res.status(200).json({
            message: 'El usuario se actualizo con éxito',
            data: response,
          });
    } catch (err) {
      next({
        status: 400,
        message: err.toString(),
      });
      return;
    }
  },

  async deleteUserById(req, res, next) {
    try {
      const id = req.params.id;
      response = await services.deleteUserById(id);
      return response.failed
        ? next(response)
        : res.status(200).json({
            message: 'El usuario se borro con éxito',
            data: response,
          });
    } catch (err) {
      next({
        status: 400,
        message: err.toString(),
      });
      return;
    }
  },
};
