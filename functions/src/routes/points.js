const controllerPoints = require('../controllers/points');

module.exports = (app) => {
  app.post('/points/', controllerPoints.createPoints);
  app.get('/points/user/', controllerPoints.getPoints);
  app.get('/points/', controllerPoints.getPointsById);
  app.put('/points/', controllerPoints.updatePointsById);
  app.delete('/points/', controllerPoints.deletePointsById);
};
