import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import weatherIcon from '../../src/assets/kasa-kun.png';

const DailyWeather = ({ geolocation }) => {
    const [data, setData] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`https://api.example.com/data?lat=${geolocation.latitude}&lon=${geolocation.longitude}`);
    //             const result = await response.json();
    //             setData(result);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [geolocation]); // Depend on geolocation to refetch when it changes

    const weatherData = {
        cityName: "San Francisco",
        current: {
            temp: 68,
            weather: [{
                icon: "01d" // This is a sunny weather icon. Change as needed.
            }]
        },
        daily: [{
            temp: {
                max: 72,
                min: 56
            }
        }]
    };

    return (
        <View style={styles.weatherContainer}>
            <View style={styles.innerContainer}>
                {/* Left Part: Weather Icon */}
                <Image
                    style={styles.weatherIcon}
                    source={weatherIcon}
                />
                {/* Right Part: Temperature, City, High/Low */}
                <View style={styles.rightPart}>
                    <Text style={styles.temperature}>{`${Math.round(weatherData.current.temp)}°`}</Text>
                    <Text style={styles.city}>{weatherData.cityName}</Text>
                    <Text style={styles.tempRange}>{`H: ${Math.round(weatherData.daily[0].temp.max)}° L: ${Math.round(weatherData.daily[0].temp.min)}°`}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        margin: 10, // Added margin for better visibility in layout
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightPart: {
        flex: 1,
        marginLeft: 20, // Added space between icon and text
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