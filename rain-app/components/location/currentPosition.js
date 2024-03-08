import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const currentPosition = () => {
    const [coords, setCoords] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setCoords({ latitude, longitude });
        })();
    }, []);

    return { coords, errorMsg };
};

export default currentPosition;