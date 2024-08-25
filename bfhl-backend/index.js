const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  const user_id = "john_doe_17091999";
  const email = "john@xyz.com";
  const roll_number = "ABCD123";
  
  if (!data) {
    return res.status(400).json({
      is_success: false,
      user_id,
      email,
      roll_number,
      numbers: [],
      alphabets: [],
      highest_alphabet: [],
    });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highest_alphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a))[0]] : [];

  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet,
  });
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get('/api/bfhl', (req, res) => {
  res.json({ message: 'Hello from API' });
});