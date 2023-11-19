const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoute = require('./routes/users');
const bookRoute = require('./routes/books')
const logOne = require('./middleware/loggerOne');

dotenv.config();


const { PORT, API_URL, MYBD } = process.env;

mongoose
  .connect(MYBD)
  .catch((error) => console.log(error));

const app = express();

const HelloWorld = (request, response) => {
  response.status(200);
  response.send('Hello, World!');
};

app.use(cors());
app.use(bodyParser.json());
app.use(logOne);
app.use(userRoute);
app.use(bookRoute);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${API_URL}:${PORT}`);
});
