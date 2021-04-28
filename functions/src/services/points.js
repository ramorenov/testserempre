const md5 = require('md5');
const { db } = require('../config/firebase');

module.exports = {
  async createPoints(uid, points) {
    try {
      const refUser = db.collection('users').doc(uid);
      const doc = await refUser.get();
      if (!doc.exists) {
        throw new Error('No se encontró el usuario.');
      }
      const refPoints = db.collection('users').doc(uid).collection('points').doc();
      const response = await refPoints.create(points);
      return response;
    } catch (err) {
      return {
        failed: true,
        status: 500,
        message: err.toString(),
      };
    }
  },

  async getPoints(uid) {
    try {
      const refUser = db.collection('users').doc(uid);
      const doc = await refUser.get();
      if (!doc.exists) {
        throw new Error('No se encontró el usuario.');
      }
      const refPoints = db.collection('users').doc(uid).collection('points');
      const snapshot = await refPoints.get();
      if (snapshot.empty) {
        throw new Error('No se encontraron puntos.');
      }
      const docs = snapshot.docs;
      const response = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
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

  async getPointsById(uid, pid) {
    try {
      const refUser = db.collection('users').doc(uid);
      const docUser = await refUser.get();
      if (!docUser.exists) {
        console.log('error de usuario');
        throw new Error('No se encontró el usuario.');
      }
      const refPoints = refUser.collection('points').doc(pid);
      const docPoints = await refPoints.get();
      if (!docPoints.exists) {
        throw new Error('No se encontró puntaje.');
      }
      const response = docPoints.data();
      return response;
    } catch (err) {
      return {
        failed: true,
        status: 500,
        message: err.toString(),
      };
    }
  },

  async updatePointsById(uid, pid, points) {
    try {
      const refUser = db.collection('users').doc(uid);
      const docUser = await refUser.get();
      if (!docUser.exists) {
        console.log('error de usuario');
        throw new Error('No se encontró el usuario.');
      }
      const refPoints = refUser.collection('points').doc(pid);
      const docPoints = await refPoints.get();
      if (!docPoints.exists) {
        throw new Error('No se encontró puntaje.');
      }
      const response = await refPoints.update({
        ...points,
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

  async deletePointsById(uid, pid) {
    try {
      const refUser = db.collection('users').doc(uid);
      const docUser = await refUser.get();
      if (!docUser.exists) {
        console.log('error de usuario');
        throw new Error('No se encontró el usuario.');
      }
      const refPoints = refUser.collection('points').doc(pid);
      const docPoints = await refPoints.get();
      if (!docPoints.exists) {
        throw new Error('No se encontró puntaje.');
      }
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
