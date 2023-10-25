import React, { useEffect } from 'react';
import { Button } from 'react-native';
// define component, and pass props
export default function RegenerateButton({ setQuotes, setDisplayQuote, quotes }) {
  
  useEffect(() => {
    // Fetch data from the API 
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => setQuotes(data))
      .catch((error) => console.error(error));
  }, []);
// define function named regenerate random quote
  const regenerateRandomQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      // random quote from 'quotes', as a new quote
      const newQuote = (quotes[randomIndex]);
      // display the new quote
      setDisplayQuote(newQuote)
    }
  };

  return (
    <Button title="Generate again" onPress={regenerateRandomQuote} />
  );
}
