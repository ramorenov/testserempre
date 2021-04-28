const schema = require('./joiSchemas');

const responseValidation = (value) => {
  if (value.error) {
    return {
      failed: true,
      status: 400,
      message: value.error.details[0].context.label,
      nameEndpoint: '/joiValidate',
    };
  }
  return value.value;
};

module.exports = {
  validateUserCreate(data) {
    const value = schema.userCreate.validate(data);
    const response = responseValidation(value);
    return response;
  },

  validateUserUpdate(data) {
    const value = schema.userUpdate.validate(data);
    const response = responseValidation(value);
    return response;
  },

  validatePointsCreate(data) {
    const value = schema.pointsCreate.validate(data);
    const response = responseValidation(value);
    return response;
  },

  validatePointsUpdate(data) {
    const value = schema.pointsUpdate.validate(data);
    const response = responseValidation(value);
    return response;
  },
};
