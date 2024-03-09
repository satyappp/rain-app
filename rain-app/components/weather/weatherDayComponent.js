import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import weatherIcon from '../../src/assets/kasa-kun.png';

const WeatherDayComponent = ({ day, highestTemp, lowestTemp }) => {
  const date = new Date(day);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <View style={styles.container}>
      <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
      <Image style={styles.weatherIcon} source={weatherIcon} />
      <View style={styles.temperatures}>
        <Text style={styles.temperature}>High: {highestTemp}°C</Text>
        <Text style={styles.temperature}>Low: {lowestTemp}°C</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    marginHorizontal: 10, 
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  temperatures: {
    marginTop: 4,
  },
  temperature: {
    fontSize: 14,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});

export default WeatherDayComponent;
