const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  if (parsedUrl.pathname === '/') {
    if (query.hello) {
      if (query.hello === '') {
        res.writeHead(400);
        res.end('Enter a name');
      } else {
        res.writeHead(200);
        res.end(Hello, ${query.hello}!);
      }
    } else if (query.users) {
      fs.readFile('data/users.json', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end();
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data);
        }
      });
    } else {
      res.writeHead(200);
      res.end('Hello, World!');
    }
  } else {
    res.writeHead(500);
    res.end();
  }
});

server.listen(3003, '127.0.0.1', () => {
  console.log('Server is running at http://127.0.0.1:3003/');
});