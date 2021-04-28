const controllerPoints = require('../controllers/points');

module.exports = (app) => {
  app.post('/points/', controllerPoints.createPoints);
  app.get('/points/', controllerPoints.getPoints);
  app.get('/points/:id', controllerPoints.getPointsById);
  app.put('/points/:id', controllerPoints.updatePointsById);
  app.delete('/points/:id', controllerPoints.deletePointsById);
};
