import React, { useEffect, useState } from 'react';
import { ImageBackground,View, Image, Text, StyleSheet } from 'react-native';
import weatherIcon from '../../src/assets/kasa-kun.png';
import weeklyWeather from './weeklyWeather';
import currentPosition from "../location/currentPosition";
import RotatingLoader from '../animations/rotatingLoader';
import { useFonts } from 'expo-font';
import weatherIconMapping from '../../utilities/weatherMapping';

const DailyWeather = ({ coord, city }) => {
    // const { coords, city, errorMsg } = currentPosition();
    const weatherData = weeklyWeather(coord);
    const [fontsLoaded] = useFonts({
        'KodomoRounded': require('../../src/assets/fonts/KodomoRounded.otf'),
    });

    if (!weatherData) {
        return(
            <View style={styles.loadingContainer}>
                <Text style={styles.loadText}>かさは持ったかさ？</Text>
                <RotatingLoader source={require('../../src/assets/kasa-kun.png')} />
            </View>
            
        )
    }
    const todayString = new Date().toISOString().split('T')[0];
    
    const TempDataToday = weatherData.find(item => item.parameter === "t_2m:C")
        ?.coordinates[0].dates.find(date => date.date.startsWith(todayString));
    
    const weatherSymbolValue = weatherData.find(item => item.parameter === "weather_symbol_24h:idx")
        ?.coordinates[0].dates.find(date => date.date.startsWith(todayString))?.value;
    
    const highestTempDataToday = weatherData.find(item => item.parameter === "t_max_2m_24h:C")
        ?.coordinates[0].dates.find(date => date.date.startsWith(todayString));

    const lowestTempDataToday = weatherData.find(item => item.parameter === "t_min_2m_24h:C")
        ?.coordinates[0].dates.find(date => date.date.startsWith(todayString));

    const icon = weatherIconMapping[weatherSymbolValue] || require('../../src/assets/kasa-kun.png');

    if (!highestTempDataToday || !lowestTempDataToday) {
        return <Text>No data available for today.</Text>;
    }
    return (
        <ImageBackground 
          source={require('../../src/assets/glass-effect-daily.png')}
          style={styles.weatherContainer}
          imageStyle={styles.backgroundImage}
          resizeMode="stretch"
        >
          <View style={styles.innerContainer}>
            <Image style={styles.weatherIcon} source={icon} />
            <View style={styles.rightPart}>
              <Text style={styles.temperature}>{`${Math.round(TempDataToday.value)}°`}</Text>
              <Text style={styles.city}>{city}</Text> 
              <Text style={styles.tempRange}>{`H: ${Math.round(highestTempDataToday.value)}° L: ${Math.round(lowestTempDataToday.value)}°`}</Text>
            </View>
          </View>
        </ImageBackground>
      );
    };

const styles = StyleSheet.create({
    loadingContainer: {
        margin: 0,
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        borderRadius: 38,
        resizeMode: 'stretch',
        
    },
    loadText: {
        marginBottom: 20,
        fontFamily: 'KodomoRounded',
        fontSize: 30,
    },
    weatherContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        margin: 30,
        borderColor: 'rgba(135, 38, 183, 0.3)',// Set the border color
        borderWidth: 2, // Set the border width
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightPart: {
        flex: 1,
        marginLeft: 40,
    },
    temperature: {
        fontSize: 60,
        color: '#FFFFFF',
        // fontFamily: 'SFProDisplay'
    },
    city: {
        fontSize: 18,
        color: '#48319D'
    },
    tempRange: {
        fontSize: 16,
        color: '#48319D'
    },
    weatherIcon: {
        width: 130,
        height: 130,
    },
    
});

export default DailyWeather;
