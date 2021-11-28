const STATUS_CODE = require('../utils/statusCode');

const errorHandler = (err) => {
  const { isCustom } = err;
  if (isCustom) {
    return {
      status: STATUS_CODE.SERVER_ERROR,
      body: `${STATUS_CODE.SERVER_ERROR} Internal Server Error`,
    };
  } else
    return {
      status: STATUS_CODE.SERVER_ERROR,
      body: `${STATUS_CODE.SERVER_ERROR} Internal Server Error`,
    };
};

module.exports = errorHandler;
