const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Allow requests from your React app's domain (replace with your actual domain)
const allowedOrigins = ['http://localhost:3000','http://localhost:3001','http://localhost:3002'];

app.use(
  cors({
    origin: allowedOrigins,
  })
);


app.get('/merged-numbers', async (req, res) => {
  try {
    
    const urls = [
      'http://20.244.56.144/numbers/primes',
      'http://20.244.56.144/numbers/fibo',
      'http://20.244.56.144/numbers/odd',
      'http://20.244.56.144/numbers/rand',
    ];

    
    const responses = await Promise.all(urls.map((url) => axios.get(url)));

    
    const allNumbers = responses
      .map((response) => response.data.numbers)
      .flat();

   
    const uniqueNumbers = [...new Set(allNumbers)];

    // Sort the unique integers in ascending order
    const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);

    // Set the Access-Control-Allow-Origin header to allow requests from your React app's domain
    res.header('Access-Control-Allow-Origin', allowedOrigins[0]); // Use the first allowed origin

    // Send the merged numbers as JSON response
    res.json({ numbers: sortedNumbers });
  } catch (error) {
    console.error('Error fetching and merging data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Your server setup here...

app.listen(8008, () => {
  console.log('Server is running on port 8008');
});
