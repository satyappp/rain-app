import React, { useState, useEffect } from 'react';
import makeUrl from './makeUrl';

const today = new Date();
const weeklyWeather = (longitude, latitude, start_date = today, interval=7) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = await makeUrl(longitude, latitude, start_date, interval);
                console.log(url);
                const response = await fetch(url);
                const result = await response.json();
                const data = await result.data;
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return data;
};

export default weeklyWeather;