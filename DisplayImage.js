
import {StyleSheet, View, Image } from 'react-native';


export default function StudentCard() {
    return (
        <View style={styles.container}>
            <Image source={require('./images/smile.jpg')} style={{ width: 300, height: 250 }} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: 30,
    },
  });