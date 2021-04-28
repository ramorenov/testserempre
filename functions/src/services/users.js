const md5 = require('md5');
const { db } = require('../config/firebase');

module.exports = {
  async createUser(user) {
    try {
      user.password = md5(user.password);
      const refUser = db.collection('users').doc();
      const response = await refUser.create(user);
      return response;
    } catch (err) {
      return {
        failed: true,
        status: 500,
        message: err.toString(),
      };
    }
  },
};
