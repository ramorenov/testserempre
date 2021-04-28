const md5 = require('md5');
const { db } = require('../config/firebase');

module.exports = {
  async createPoints(user) {
    try {
      user.password = md5(user.password);
      const refPoints = db.collection('points').doc();
      const response = await refPoints.create(user);
      return response;
    } catch (err) {
      return {
        failed: true,
        status: 500,
        message: err.toString(),
      };
    }
  },

  async getPoints() {
    try {
      const refPoints = db.collection('points');
      const snapshot = await refPoints.get();
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

  async getPointsById(id) {
    try {
      const refPoints = db.collection('points').doc(id);
      const doc = await refPoints.get();
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

  async updatePointsById(id, user) {
    try {
      if (user.password) {
        user.password = md5(user.password);
      }
      const refPoints = db.collection('points').doc(id);
      const response = await refPoints.update({
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

  async deletePointsById(id) {
    try {
      const refPoints = db.collection('points').doc(id);
      const response = await refPoints.delete();
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
