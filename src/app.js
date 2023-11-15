const express = require('express');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const bookRouter = require("./routes/books");
const loggerOne = require('./middlewares/loggerOne')


dotenv.config()

const {
    PORT = 3000, 
    API_URL = "http://127.0.0.1",
    MONGO_URL = "mongodb://127.0.0.1:27017/test"
} = process.env;


mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
const app = express();

const helloWorld = (request, response) => {
    response.status(200),
    response.send('Hello, World!')
}

app.use(cors())
app.use(loggerOne)
app.use(bodyParser.json())
app.get('/', helloWorld)

app.post('/', (request, response) => {
    response.status(200),
    response.send('Hello, from POST!')
})

app.use(userRouter)
app.use(bookRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
  });
  
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  });
  

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
})

