import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://theysaidso.p.rapidapi.com/quote/random',
  params: {language: 'en'},
  headers: {
    'X-RapidAPI-Key': '3ca1b563b8msh43c46189f1f12d8p1f1b06jsn364dd92be195',
    'X-RapidAPI-Host': 'theysaidso.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

export default function App() {
  return (
    <View style={styles.container}>
    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Welcome to Quote Generator
      </Text>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
});
