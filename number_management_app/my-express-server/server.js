const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Allow requests from your React app's domain (replace with your actual domain)
const allowedOrigins = ['http://localhost:3000','http://localhost:3001','http://localhost:3003']; // Update this with your React app's domain

app.use(
  cors({
    origin: allowedOrigins,
  })
);

// Define routes for the provided URLs
app.get('/numbers/primes', async (req, res) => {
  try {
    // Fetch data from the external API (http://20.244.56.144/numbers/primes)
    const response = await axios.get('http://20.244.56.144/numbers/primes');
    const numbers = response.data.numbers;
    res.json({ numbers });
  } catch (error) {
    console.error('Error fetching data from /numbers/primes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/numbers/fibo', async (req, res) => {
  try {
    // Fetch data from the external API (http://20.244.56.144/numbers/fibo)
    const response = await axios.get('http://20.244.56.144/numbers/fibo');
    const numbers = response.data.numbers;
    res.json({ numbers });
  } catch (error) {
    console.error('Error fetching data from /numbers/fibo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/numbers/odd', async (req, res) => {
  try {
    // Fetch data from the external API (http://20.244.56.144/numbers/odd)
    const response = await axios.get('http://20.244.56.144/numbers/odd');
    const numbers = response.data.numbers;
    res.json({ numbers });
  } catch (error) {
    console.error('Error fetching data from /numbers/odd:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/numbers/rand', async (req, res) => {
  try {
    // Fetch data from the external API (http://20.244.56.144/numbers/rand)
    const response = await axios.get('http://20.244.56.144/numbers/rand');
    const numbers = response.data.numbers;
    res.json({ numbers });
  } catch (error) {
    console.error('Error fetching data from /numbers/rand:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Your server setup here...

const PORT = process.env.PORT || 8008; // Use the specified PORT or default to 8008

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
