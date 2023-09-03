import React, { useEffect, useState } from 'react';

const App = () => {
  const [mergedNumbers, setMergedNumbers] = useState([]);

  useEffect(() => {
    // Make a GET request to your Express.js server (running on port 8008)
    fetch('http://localhost:8008/merged-numbers')
      .then((response) => response.json())
      .then((data) => {
        setMergedNumbers(data.numbers);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Merged Unique Integers</h1>
      <ul>
        {mergedNumbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
