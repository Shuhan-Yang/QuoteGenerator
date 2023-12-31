import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import DisplayImage from './DisplayImage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegenerateButton from './RegenerateButton';

// import required modules and components

// navigation stack
const Stack = createStackNavigator();

// pass props
function HomeScreen({ displayQuote, quotes, setQuotes, setDisplayQuote, imageOption }) {
  const navigation = useNavigation(); 
  // initialize imageindex to display image
  const [imageIndex, setImageIndex] = useState(0);
  // initialize savedQuotes array to store saved quotes
  const [savedQuotes, setSavedQuotes] = useState([]);

  // alert message 
  const saveAlert = () => {
    // current display quote
    const savedQuote = displayQuote;
    // update the state by create new array, ...spread operator https://www.w3schools.com/react/react_es6_spread.asp
    setSavedQuotes((usedSavedQuotes) => [...usedSavedQuotes, savedQuote]);
    Alert.alert('Saved','You saved the quote', [{ text: 'OK' }]);
  };
  

  return (
    <View style={styles.container}>
    <View style={styles.savedquote}>
    {/* navigate to menu screen */}
    {/* pass savedquotes as parameter, display the data */}
      <Button title="Saved" onPress={() => navigation.navigate('Menu', { savedQuotes })} />
      </View>
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: 10, color: "blue" }}>
        Welcome to Quote Generator
      </Text>
      <StatusBar style="auto" />
      {/* Display quote */}
      <Text style={{ fontSize: 20, marginTop: 60, marginLeft: 20, marginRight: 20, justifyContent: "center" }}>
        {displayQuote.text}
      </Text>
      <Text style={{ fontSize: 16, fontStyle: 'italic', marginTop: 10 }}>
        -- {displayQuote.author}
      </Text>
      <DisplayImage imageOption={imageOption} imageIndex={imageIndex} />
      <View style={styles.button}>
        <Button title="Save" onPress={saveAlert} />
      </View>
      <View style={styles.generate}>
      {/* render in component for regenerating quote */}
      <RegenerateButton setQuotes={setQuotes} setDisplayQuote={setDisplayQuote} quotes={quotes} imageIndex={imageIndex} setImageIndex={setImageIndex} imageOption={imageOption} />

      </View>
    </View>
  );
}

function MenuScreen({ route }) {
  // extract data from route.params, part of the resource is from https://reactnavigation.org/docs/3.x/params/
  const { savedQuotes } = route.params;
  return (
    <View style={styles.quote}>
 
      <Text style = {{fontSize: 25, color: 'blue', alignItems: 'center'}} >Saved Quote</Text>
     {/* map through savedQuotes array and display the quote and author */}
      {savedQuotes.map((quote, index) => (
        <View key={index}>
          <Text style = {{fontSize: 18, padding: 5, marginTop: 6}}>{quote.text}</Text>
          <Text style = {{fontStyle: 'italic'}}>-- {quote.author}</Text>
        </View> ))}
    </View>
  );
}

export default function App() {
  // define imageoption array, use require to allowed to use local resources 
  const imageOption = [
    require('./images/smile.jpg'),
    require('./images/smile2.jpg'),
    require('./images/smile3.jpg'),
    require('./images/smile4.jpg'),
    require('./images/smile5.jpg'),
    require('./images/smile6.jpg'),
    require('./images/smile7.jpg'),
    require('./images/smile8.jpg'),
    require('./images/smile9.jpg'),
    require('./images/smile10.jpg'),
  ];
   // define variables, and store quote, similar with last assignment 
  // manage array of fetched quote, can be updated
  const [quotes, setQuotes] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
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

  // const handleRegenerate = () => {
  //   regenerateRandomQuote();
  //   regenerateRandomImage();
  // };

  const regenerateRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageOption.length);
    setImageIndex(randomIndex); // Update imageIndex with a new random index
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {/* pass those data as props to homescreen */}
        <Stack.Screen name="Home">
          {() => <HomeScreen displayQuote={displayQuote} 
            quotes={quotes}
            setQuotes={setQuotes}
            setDisplayQuote={setDisplayQuote}
            imageOption={imageOption}
          />}
        </Stack.Screen>
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
    marginBottom: 180,
  },
  savedquote: {
    marginLeft: 350,
    
  },
  quote: {
    marginLeft: 5,
  },
  generate: {
    marginBottom: 80,
  },

});
