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
import BottomNavBar from '../components/navigation/bottomNavBar';
import { View, Text, StyleSheet } from 'react-native';
import WeeklyWeatherComponent from '../components/weather/weeklyWeatherComponent';
import AppStack from '../navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';
const HomeScreen = () => {
    const { coords, city, errorMsg } = currentPosition();
    return (
      <View style={styles.container}>
        <DailyWeather coord={coords} city = {city}/> 
        <WeeklyWeatherComponent coords={coords} />
        {/* <BottomNavBar /> */}
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
  
  export default HomeScreen;
