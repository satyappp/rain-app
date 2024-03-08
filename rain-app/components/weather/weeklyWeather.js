import React, { useState, useEffect } from 'react';
import makeUrl from './makeUrl';
// import { format } from 'path';

const today = new Date();
const weeklyWeather = (coords, startDate = today , interval=6) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (coords === null || coords===undefined) return null;
            try {
                const url = await makeUrl(coords.longitude, coords.latitude, startDate, interval);
                console.log(url);
                const response = await fetch(url);
                const result = await response.json();
                const data = await result.data;
                console.log("Fetched Data:", data); 

                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [coords]);

    return data;
};

export default weeklyWeather;