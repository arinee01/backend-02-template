const http = require('http');
const getUsers = require("./modules/allUsers");
const getBooks = require("./modules/allBooks");
const addBookToFav = require("./modules/addBookToFav");

const hostName = "http://127.0.0.1";
const port = process.env.PORT || 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, hostName);
  const userName = url.searchParams.get("name");
  const bookId = url.searchParams.get("id");

  if (userName) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello ${userName}`);
    response.end();
    return;
  }
  if (bookId) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "application/json");
    response.end(addBookToFav(bookId));
    return;
  }

  switch (request.url) {
    case "/?users":
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "application/json");
      response.write(getUsers());
      response.end();
      break;

    case "/?books":
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "application/json");
      response.write(getBooks());
      response.end();
      break;

    case "/?name":
      response.statusCode = 400;
      response.statusMessage = "Bad Request";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Enter a name`);
      response.end();
      break;

    case "/":
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Hello world`);
      response.end();
      break;

    default:
      response.statusCode = 500;
      response.statusMessage = "Internal Server Error";
      response.setHeader("Content-Type", "text/plain");
      response.write("wrong");
      response.end();
      break;
  }
});


server.listen(port, () => {
    console.log(`сервер запущен по адресу ${hostName}:${port}`);
} )