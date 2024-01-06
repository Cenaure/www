require('dotenv').config();
const { serve } = require('@hono/node-server');
const { Hono } = require('hono');
const mongoose = require('mongoose');
const cors = require('cors');

const app = new Hono();
const { PORT, DB_URL } = process.env;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected!'))
  .catch((err: any) => console.log(err));

app.get('/', (c: any) => {
  return c.text('Hello Hono!');
});

console.log(`Server is running on port ${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT
});
