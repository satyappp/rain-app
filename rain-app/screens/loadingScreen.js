import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing} from 'react-native';

const LoadingScreen = () => {
  const spinAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log("Starting animation"); 
    const animation = Animated.loop(
        Animated.timing(spinAnimation, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.linear,
        })
    );

    animation.start();

    return () => animation.stop(); 
}, [spinAnimation]);

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], 
  });

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20,fontFamily: 'KodomoRounded', fontSize: 30 }}>かさは持ったかさ？</Text>
      <Animated.Image
        style={[styles.image, { transform: [{ rotate: spin }] }]}
        source={require('../src/assets/kasa-kun.png')} 
      />
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
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'KodomoRounded'
  },
  image: {
    width: 200, 
    height: 200,
  },
});

export default LoadingScreen;
