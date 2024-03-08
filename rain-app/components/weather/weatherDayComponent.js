import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherDayComponent = ({ day, highestTemp, lowestTemp }) => {
  // Convert the date to a day of the week
  const date = new Date(day);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <View style={styles.container}>
      <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
      <View style={styles.temperatures}>
        <Text style={styles.temperature}>High: {highestTemp}°C</Text>
        <Text style={styles.temperature}>Low: {lowestTemp}°C</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center content horizontally in the container
    marginHorizontal: 10, // Add some space between each day component
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  temperatures: {
    marginTop: 4, // Space between day of the week and temperatures
  },
  temperature: {
    fontSize: 14,
  },
});

export default WeatherDayComponent;
