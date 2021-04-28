const services = require('../services/points');
const validate = require('../utils/JoiVerify/joiValidate');

module.exports = {
  async createPoints(req, res, next) {
    try {
      const uid = req.query.uid;
      const points = validate.validatePointsCreate(req.body);
      if (points.failed) {
        next(points);
        return;
      }
      response = await services.createPoints(uid, points);
      response.failed
        ? next(response)
        : res.status(201).json({
            message: 'El puntaje se creo con éxito',
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
      const uid = req.query.uid;
      response = await services.getPoints(uid);
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
      const uid = req.query.uid;
      const pid = req.query.pid;
      response = await services.getPointsById(uid, pid);
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
      const uid = req.query.uid;
      const pid = req.query.pid;
      const points = validate.validatePointsUpdate(req.body);
      if (points.failed) {
        next(points);
      }
      response = await services.updatePointsById(uid, pid, points);
      response.failed
        ? next(response)
        : res.status(200).json({
            message: 'El puntaje se actualizo con éxito',
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
      const uid = req.query.uid;
      const pid = req.query.pid;
      response = await services.deletePointsById(uid, pid);
      response.failed
        ? next(response)
        : res.status(200).json({
            message: 'El puntaje se borro con éxito',
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
