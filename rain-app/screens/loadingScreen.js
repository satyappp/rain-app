import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RotatingLoader from '../components/animations/rotatingLoader';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>かさは持ったかさ？</Text>
      <RotatingLoader source={require('../src/assets/kasa-kun.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginBottom: 20,
    fontFamily: 'KodomoRounded',
    fontSize: 30,
  },
});

export default LoadingScreen;
