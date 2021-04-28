const services = require('../services/points');
const validate = require('../utils/JoiVerify/joiValidate');

module.exports = {
  async createPoints(req, res, next) {
    try {
      const user = validate.validatePointsCreate(req.body);
      if (user.failed) {
        next(user);
      }
      response = await services.createPoints(user);
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

  async getPoints(req, res, next) {
    try {
      response = await services.getPoints();
      response.failed ? next(response) : res.status(200).json(response);
    } catch (err) {
      next({
        status: 400,
        message: err.toString(),
      });
    }
  },

  async getPointsById(req, res, next) {
    try {
      const id = req.params.id;
      response = await services.getPointsById(id);
      response.failed ? next(response) : res.status(200).json(response);
    } catch (err) {
      next({
        status: 400,
        message: err.toString(),
      });
    }
  },

  async updatePointsById(req, res, next) {
    try {
      const id = req.params.id;
      const user = validate.validatePointsUpdate(req.body);
      if (user.failed) {
        next(user);
      }
      response = await services.updatePointsById(id, user);
      response.failed
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
    }
  },

  async deletePointsById(req, res, next) {
    try {
      const id = req.params.id;
      response = await services.deletePointsById(id);
      response.failed
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
    }
  },
};
