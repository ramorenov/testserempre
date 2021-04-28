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

  async getUsers() {
    try {
      const refUser = db.collection('users');
      const snapshot = await refUser.get();
      if (snapshot.empty) {
        throw new Error('No se encontraron usuarios.');
      }
      const docs = snapshot.docs;
      const response = docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
      }));
      return response;
    } catch (err) {
      return {
        failed: true,
        status: 500,
        message: err.toString(),
      };
    }
  },

  async getUserById(id) {
    try {
      const refUser = db.collection('users').doc(id);
      const doc = await refUser.get();
      if (doc.empty) {
        throw new Error('No se el usuario.');
      }
      const response = doc.data();
      delete response.password;
      return response;
    } catch (err) {
      return {
        failed: true,
        status: 500,
        message: err.toString(),
      };
    }
  },

  async updateUserById(id, user) {
    try {
      if (user.password) {
        user.password = md5(user.password);
      }
      const refUser = db.collection('users').doc(id);
      const response = await refUser.update({
        ...user,
      });
      return response;
    } catch (err) {
      return {
        failed: true,
        status: 500,
        message: err.toString(),
      };
    }
  },

  async deleteUserById(id) {
    try {
      const refUser = db.collection('users').doc(id);
      const response = await refUser.delete();
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
