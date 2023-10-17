import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import DisplayImage from './DisplayImage';

export default function App() {
  // define variables, and store quote, similar with last assignment 
  // manage array of fetched quote, can be updated
  const [quotes, setQuotes] = useState([]);
  // manage displayed quote, such as text and author
  const [displayQuote, setDisplayQuote] = useState({ text: '', author: '' });
// fetch data from api
  useEffect(() => {
    // Fetch data from the API and set it in the state
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => setQuotes(data))
      .catch((error) => console.error(error));
  }, []);
// randomly select quote, resource from https://stackoverflow.com/questions/70169050/how-to-get-random-data-from-api
  useEffect(() => {
    // Randomly select a quote 
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setDisplayQuote(quotes[randomIndex]);
    }
  }, [quotes]);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 26, fontWeight: 'bold', marginTop: 100,color: "blue"}}>Welcome to Quote Generator</Text>
      <StatusBar style="auto" />
      {/* Display quote */}
      <Text style={{fontSize: 20, marginTop: 60, marginLeft:20, marginRight:20, justifyContent: "center"}}>{displayQuote.text}</Text>
      <Text style={{fontSize: 16, fontStyle: 'italic', marginTop: 10}}>-- {displayQuote.author}</Text>
      <DisplayImage />
      <View style={styles.button}>
        <Button title="Save" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: "center",
    marginBottom: 300,
  }
});
