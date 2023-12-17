const fs = require("fs");
const path = require("path");

const getAllBooks = () => {
  const filePath = path.join(__dirname, "../data/books.json");
  return fs.readFileSync(filePath);
};

module.exports = getAllBooks;
