import React, { useState, useEffect } from 'react';
import * as Location from "expo-location";

const currentPosition = ()=>{
    const [data, setData] = useState("hoge");

    useEffect(()=>{
        const fetchData = async ()=>{
            await navigator.geolocation.getCurrentPosition(
                (position)=>{
                    const result = position.coords;
                    setData(result);
                },
                (error)=>{
                    console.log("Error fetching data:", error);
                }
            );
        };
        
        fetchData();
    },[])

    return data;
}

export default currentPosition;