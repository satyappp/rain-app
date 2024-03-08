import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const currentPosition = () => {
    const [locationInfo, setLocationInfo] = useState({
        coords: null,
        city: null,
        errorMsg: null,
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationInfo(prevState => ({ ...prevState, errorMsg: 'Permission to access location was denied' }));
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // Reverse geocoding to get city name
            const address = await Location.reverseGeocodeAsync({ latitude, longitude });
            const city = address[0]?.city; // Grabbing the city from the first address returned

            setLocationInfo({
                coords: { latitude, longitude },
                city,
                errorMsg: null,
            });
        })();
    }, []);

    return locationInfo; // Returns coords, city, and errorMsg
};

export default currentPosition;
