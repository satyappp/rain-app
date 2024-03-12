import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

const RotatingLoader = ({ source, style }) => {
  const spinAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
    <Animated.Image
      style={[
        styles.image,
        { transform: [{ rotate: spin }] },
        style, 
      ]}
      source={source}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default RotatingLoader;
