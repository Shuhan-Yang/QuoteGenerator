import { StyleSheet, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

// const imageOption = [
//   require('./images/smile.jpg'),
//   require('./images/smile2.jpg'),
//   require('./images/smile3.jpg'),
//   require('./images/smile4.jpg'),
//   require('./images/smile5.jpg'),
//   require('./images/smile6.jpg'),
//   require('./images/smile7.jpg'),
//   require('./images/smile8.jpg'),
//   require('./images/smile9.jpg'),
//   require('./images/smile10.jpg'),
// ];

// props allow to pass array of images 
export default function DisplayImage({imageOption, imageIndex}) {

  const displayedImage = imageOption[imageIndex];

  return (
    <View style={styles.container}>
      <Image source={displayedImage} style={{ width: 330, height: 250 }} />
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
