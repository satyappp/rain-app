// /* Rectangle 1 */

// box-sizing: border-box;

// position: absolute;
// width: 362.83px;
// height: 205px;
// left: 14px;
// top: 111px;

// background: radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
// backdrop-filter: blur(40px);
// /* Note: backdrop-filter has minimal browser support */
// border-radius: 59px;

import DailyWeather from '../components/weather/dailyWeather';
import currentPosition from "../components/location/currentPosition";
import React from 'react';
import { Image, ImageBackground,View, Text, StyleSheet } from 'react-native';
import WeeklyWeatherComponent from '../components/weather/weeklyWeatherComponent';
import AppStack from '../navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';
const HomeScreen = () => {
    const { coords, city, errorMsg } = currentPosition();
    return (
        <ImageBackground source={require('../src/assets/sun-home-bg.png')} style={styles.backgroundImage} >
            <View style={styles.container}>
                <DailyWeather coord={coords} city = {city}/> 
                <Image source={require('../src/assets/kasa-kun.png')} 
                    style={styles.absoluteImage}></Image>
                <WeeklyWeatherComponent coords={coords} />
            </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'stretch',
        bottom: 0,
    },
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%',
      paddingTop: 30,
      paddingBottom: 30,

    },
    absoluteImage: {
        position: 'absolute',
        top: '50%', 
        left: '50%', 
        transform: [{ translateX: 80 }, { translateY: -200 }], 
        width: 100, 
        height: 100,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
  
  export default HomeScreen;
