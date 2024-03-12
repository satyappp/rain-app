import React from 'react';
import { ImageBackground,View, Text, StyleSheet, Image } from 'react-native';
import weatherIconMapping from '../../utilities/weatherMapping';

const WeatherDayComponent = ({ day, highestTemp, lowestTemp, weatherSymbol }) => {
  const date = new Date(day);
  const dayAndMonth = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  const icon = weatherIconMapping[weatherSymbol] || require('../../src/assets/kasa-kun.png'); // Fallback to the default icon
  return (
    <ImageBackground 
          source={require('../../src/assets/glass-effect-weekly.png')}
          style={styles.container}
          imageStyle={styles.backgroundImage}
          resizeMode="stretch"
        >
      <Text style={styles.dayOfWeek}>{dayAndMonth}</Text>
      <Image style={styles.weatherIcon} source={icon} />
      <View style={styles.temperatures}>
        <Text style={styles.temperature}>H: {highestTemp}°</Text>
        <Text style={styles.temperature}>L: {lowestTemp}°</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    borderRadius: 38,
    resizeMode: 'stretch',     
  },
  container: {
    alignItems: 'center', 
    marginHorizontal: 10, 
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.32,
    shadowRadius: 2.22,
    elevation: 3,
    
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    
  },
  temperatures: {
    marginTop: 4,
    color: 'white',
  },
  temperature: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginBottom:15,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default WeatherDayComponent;
