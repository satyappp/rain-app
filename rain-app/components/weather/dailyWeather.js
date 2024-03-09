import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import weatherIcon from '../../src/assets/kasa-kun.png';
import weeklyWeather from './weeklyWeather';
import currentPosition from "../location/currentPosition";
import RotatingLoader from '../animations/rotatingLoader';

// const DailyWeather = ({ geolocation }) => {
//     // Directly call weeklyWeather hook with geolocation
//     const weeklyData = weeklyWeather(geolocation);

//     const [todaysWeather, setTodaysWeather] = useState({ currentTemp: null, maxTemp: null, minTemp: null });

//     useEffect(() => {
//         // Assuming weeklyData structure is directly usable or null initially
//         if (weeklyData) {
//             const todayString = new Date().toISOString().split('T')[0];
//             // Assuming weeklyData is an array of weather data for the week
//             const todaysData = weeklyData.find(d => d.date && d.date.startsWith(todayString));
//             if (todaysData) {
//                 // Assuming todaysData includes the necessary weather details
//                 setTodaysWeather({
//                     currentTemp: todaysData.currentTemp, // Adjust these keys based on your data structure
//                     maxTemp: todaysData.maxTemp,
//                     minTemp: todaysData.minTemp,
//                 });
//             }
//         }
//     }, [weeklyData]); // Re-run effect when weeklyData changes

//     return (
//         <View style={styles.weatherContainer}>
//             <View style={styles.innerContainer}>
//                 <Image style={styles.weatherIcon} source={weatherIcon} />
//                 {todaysWeather.currentTemp ? (
//                     <View style={styles.rightPart}>
//                         <Text style={styles.temperature}>{`${Math.round(todaysWeather.currentTemp)}°`}</Text>
//                         <Text style={styles.city}>{"Your City Name"}</Text>
//                         <Text style={styles.tempRange}>{`H: ${Math.round(todaysWeather.maxTemp)}° L: ${Math.round(todaysWeather.minTemp)}°`}</Text>
//                     </View>
//                 ) : (
//                     <Text>Loading...</Text>
//                 )}
//             </View>
//         </View>
//     );
// };

// // Your existing styles
// const styles = StyleSheet.create({
//     weatherContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: '#f9f9f9',
//         borderRadius: 8,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.22,
//         shadowRadius: 2.22,
//         elevation: 3,
//         margin: 10,
//     },
//     innerContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     rightPart: {
//         flex: 1,
//         marginLeft: 20,
//     },
//     temperature: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     city: {
//         fontSize: 18,
//     },
//     tempRange: {
//         fontSize: 16,
//     },
//     weatherIcon: {
//         width: 50,
//         height: 50,
//     },
// });

// export default DailyWeather;

const DailyWeather = ({ coord, city }) => {
    // const { coords, city, errorMsg } = currentPosition();
    const weatherData = weeklyWeather(coord);

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

    const highestTempDataToday = weatherData.find(item => item.parameter === "t_max_2m_24h:C")
        ?.coordinates[0].dates.find(date => date.date.startsWith(todayString));

    const lowestTempDataToday = weatherData.find(item => item.parameter === "t_min_2m_24h:C")
        ?.coordinates[0].dates.find(date => date.date.startsWith(todayString));

    if (!highestTempDataToday || !lowestTempDataToday) {
        return <Text>No data available for today.</Text>;
    }
    return (
        <View style={styles.weatherContainer}>
            <View style={styles.innerContainer}>
                <Image style={styles.weatherIcon} source={weatherIcon} />
                <View style={styles.rightPart}>
                    <Text style={styles.temperature}>{`${Math.round(TempDataToday.value)}°`}</Text>
                    <Text style={styles.city}>{city}</Text> 
                    <Text style={styles.tempRange}>{`H: ${Math.round(highestTempDataToday.value)}° L: ${Math.round(lowestTempDataToday.value)}°`}</Text>
                </View>
            </View>
        </View>
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
    loadText: {
        marginBottom: 20,
        fontFamily: 'KodomoRounded',
        fontSize: 30,
    },
    weatherContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        margin: 30,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightPart: {
        flex: 1,
        marginLeft: 20,
    },
    temperature: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    city: {
        fontSize: 18,
    },
    tempRange: {
        fontSize: 16,
    },
    weatherIcon: {
        width: 50,
        height: 50,
    },
    
});

export default DailyWeather;
