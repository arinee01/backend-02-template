const dotenv = require('dotenv');
dotenv.config();
const { PORT, API_URL } = process.env;


const logOneMiddleware = (request, response, next) => {
    console.log(`Запрос пришел с URL ${API_URL}:${PORT}${request.url}`);
    next();
  };

module.exports = logOneMiddleware;