const router = require("express").Router();
const {getBooks,getBook,createBooks,updateBook,deleteBook} = require("../controlers/books")

router.get("/books", getBooks);
router.get("/books/:book_id", getBook);
router.post("/books", createBooks);
router.patch("/books/:book_id", updateBook);
router.delete("/books/:book_id", deleteBook);

module.exports = router;
