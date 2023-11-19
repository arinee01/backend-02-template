const logTwoMiddleware = (request, response, next) => {
    console.log(`log Two method ${request.method}`);
    next();
  };

module.exports = logTwoMiddleware;