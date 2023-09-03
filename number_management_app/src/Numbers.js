import React, { useState, useEffect } from 'react';
import axios from 'axios'; //i've used axios for connecting to the requests

const NumberList = () => {
  const [mergedNumbers, setMergedNumbers] = useState([]);

  useEffect(() => {
    // i defined the urls here , which is reference from the Test servers API
    const urls = [
      'http://20.244.56.144/numbers/primes',
      'http://20.244.56.144/numbers/fibo',
      'http://20.244.56.144/numbers/odd',
      'http://20.244.56.144/numbers/rand',
    ];

    // get the data
    const fetchData = async () => {
      const promises = urls.map(async (url) => {
        try {
          const response = await axios.get(url, { timeout: 500 });
          return response.data.numbers;
        } catch (error) {
          console.error(`Error fetching data from ${url}:`, error);
          return [];
        }
      });

      const responses = await Promise.all(promises);

        // main function , where it extracts and merges the numbers 
        const allNumbers = responses
        .flatMap((response) => response)
        .filter((number) => typeof number === 'number');

      const uniqueNumbers = [...new Set(allNumbers)];
      const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);

      setMergedNumbers(sortedNumbers);
    };


    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className="text-xl font-bold mb-4 ">Merged Unique Integers</h1>
      <ul className="list-disc pl-4">
        {mergedNumbers.map((number) => (
          <li key={number} className="text-lg mb-2">
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default NumberList;
