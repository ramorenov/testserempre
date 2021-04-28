const controllerUser = require('../controllers/users');

module.exports = (app) => {
  app.post('/users/', controllerUser.createUser);
  app.get('/users/', controllerUser.getUsers);
  //app.get('/users/:id', controllerUser.getUserById);
  //app.put('/users/:id', controllerUser.updateUserById);
  //app.delete('/users/:id', controllerUser.deleteUserById);
};
