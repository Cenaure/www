require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path')

const { PORT, DB_URL } = process.env;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Pictures
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));

// Routes
app.use('/api', router);

// Error handling middleware
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`Server started on PORT = ${PORT}`)
    );
  } catch (error) {
    console.error(error);
  }
};

start();
