const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRouter = require('./routes/API/auth');
const booksRouter = require('./routes/API/books');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);
app.use('/api/books', booksRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
