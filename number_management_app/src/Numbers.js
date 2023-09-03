import React, { useEffect, useState } from 'react';
import './index';

const App = () => {
  const [mergedNumbers, setMergedNumbers] = useState([]);

  useEffect(() => {
    // Define the URLs to fetch data from
    const urls = [
      'http://localhost:8008/numbers/primes',
      'http://localhost:8008/numbers/fibo',
      'http://localhost:8008/numbers/odd',
      'http://localhost:8008/numbers/rand',
    ];

    // Make GET requests to all the URLs in parallel
    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .then((data) => data.numbers)
          .catch((error) => {
            console.error(`Error fetching data from ${url}:`, error);
            return [];
          })
      )
    )
      .then((responses) => {
        // Merge and sort the data
        const mergedData = responses.flat().filter((number) => typeof number === 'number');
        const uniqueNumbers = [...new Set(mergedData)];
        const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);
        setMergedNumbers(sortedNumbers);
      })
      .catch((error) => {
        console.error('Error merging data:', error);
      });
  }, []);

  return (
    // <div className="min-h-screen bg-gray-100 p-4">
    //   <h1 className="text-2xl font-semibold mb-4">Merged Unique Integers</h1>
    //   <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    //     {mergedNumbers.map((number) => (
    //       <li
    //         key={number}
    //         className="bg-white rounded-lg p-4 shadow-md transition-transform transform hover:scale-105"
    //       >
    //         {number}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '1rem' }}>
  <h1 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Merged Unique Integers</h1>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
    {mergedNumbers.map((number) => (
      <div
        key={number}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '0.25rem',
          padding: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s',
          transformOrigin: 'center',
          cursor: 'pointer',
          display: 'inline-block',
          margin: '0.25rem',
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        {number}
      </div>
    ))}
  </div>
</div>


  );
};

export default App;
