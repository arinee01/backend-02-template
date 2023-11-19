const Book = require('../models/book');

const getBooks = async (request, response) => {
  try {
    const books = await Book.find({});
    books.length
      ? response.status(200).send(books)
      : response.status(400).send('Books not found');
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const getBook = async (request, response) => {
  
  try {
    const { book_id } = request.params;
    const book = await Book.findById(book_id);
    book
      ? response.status(200).send(book)
      : response.status(404).send('Book not found, please check your request');
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const createBooks = async (request, response) => {
  const data = request.body;
  try {
    const bookCreate = await Book.create(data);
    bookCreate
      ? response.status(200).send(bookCreate)
      : response.status(404).send('Failed to add book');
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const updateBook = async (request, response) => {
  const dataUpdate = request.body;
  const { book_id } = request.params;
  try {
    const bookUpdate = await Book.findByIdAndUpdate(book_id, { ...dataUpdate });
    bookUpdate
      ? response.status(200).send(bookUpdate)
      : response.status(404).send('Failed to update book');
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const deleteBook = async (request, response) => {
  const { book_id } = request.params;
  try {
    const bookDelete = await Book.findByIdAndDelete(book_id);
    bookDelete
      ? response.status(200).send(`Book ${book_id} deleted`)
      : response.status(404).send(`Book ${book_id} not found`);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

module.exports = {
  getBooks,
  getBook,
  createBooks,
  updateBook,
  deleteBook,
};
