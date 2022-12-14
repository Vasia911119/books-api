const express = require('express');
const router = express.Router();

const tryCatchMiddleware = require('../../middlewares/tryCatch');
const validation = require('../../middlewares/validation');
const {
  addBooks,
  getBooks,
  booksReview,
  updateBookStatus,
  deleteBook,
} = require('../../controllers/book');
const auth = require('../../middlewares/auth');
const {
  addBookJoiSchema,
  bookReviewJoiSchema,
  bookStatusJoiSchema,
} = require('../../models/bookSchema');

// Роут для создания книги
router.post(
  '/',
  auth,
  validation(addBookJoiSchema),
  tryCatchMiddleware(addBooks),
);
// Роут для списка всех книг
router.get('/', auth, tryCatchMiddleware(getBooks));

// Роут для создания отзыва
router.patch(
  '/:bookId/review',
  auth,
  validation(bookReviewJoiSchema),
  tryCatchMiddleware(booksReview),
);
// Роут для обновления статуса книги
router.patch(
  '/:bookId/status',
  auth,
  validation(bookStatusJoiSchema),
  tryCatchMiddleware(updateBookStatus),
);

// Роут для удаления книги

router.delete('/:bookId', auth, tryCatchMiddleware(deleteBook));

module.exports = router;

