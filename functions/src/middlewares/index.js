module.exports = {
  async handlerError(err, req, res, next) {
    res.status(err.status).json({ ERROR: err.message });
    next();
  },
};
