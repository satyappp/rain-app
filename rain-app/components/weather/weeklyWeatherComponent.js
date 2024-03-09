import React from 'react';
import { StyleSheet,View, ScrollView, Text } from 'react-native';
import WeatherDayComponent from './weatherDayComponent'; 
import weeklyWeather from './weeklyWeather'; 

const WeeklyWeatherComponent = ({ coords }) => {
  const weatherData = weeklyWeather(coords);

  if (!weatherData) {
    return;
  }

  const highestTempData = weatherData.find(item => item.parameter === "t_max_2m_24h:C");
  const lowestTempData = weatherData.find(item => item.parameter === "t_min_2m_24h:C");
  const weatherSymbolData = weatherData.find(item => item.parameter === "weather_symbol_24h:idx");
  return (
    <ScrollView horizontal={true} style={styles.scrollView}>
      {highestTempData.coordinates[0].dates.map((dateItem, index) => {
        const highestTemp = dateItem.value;
        const lowestTemp = lowestTempData.coordinates[0].dates[index].value;
        const weatherSymbol = weatherSymbolData.coordinates[0].dates[index].value;
        return (
          <View key={index} style={styles.column}>
            <WeatherDayComponent
              day={dateItem.date}
              highestTemp={highestTemp}
              lowestTemp={lowestTemp}
              weatherSymbol={weatherSymbol}             
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row', 
    margin: 30,
  },
  column: {
  },
});

export default WeeklyWeatherComponent;