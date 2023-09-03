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
      try {
        const responses = await Promise.all(
          urls.map((url) => axios.get(`http://localhost:8008/numbers?url=${url}`))
        );

        // main function , where it extracts and merges the numbers 
        const allNumbers = responses
          .map((response) => response.data.numbers)
          .flat();

        // am using set as the data structure because , only one entry is possible 
        const uniqueNumbers = [...new Set(allNumbers)];
        const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);

        setMergedNumbers(sortedNumbers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

export default NumberList;
