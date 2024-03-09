import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useState} from "react";

// import currentPosition from "./components/location/currentPosition";
import _weeklyWeather from './components/weather/weeklyWeather';
import getUser from "./components/users/restResources";
import dailyWeather from './components/weather/dailyWeather';
import HomeScreen from './screens/homescreen';
import NotificationTestScreen from './screens/notificationTest';
import * as TaskManager from "expo-task-manager";


export default function App() {
  // useEffect(()=>{
  //   const check = async ()=>{
  //     await TaskManager.defineTask("LOCATION_TASK", ()=>{
  //       console.log("Task set");
  //     });
  //     TaskManager.isAvailableAsync().then((res)=>console.log(res)).catch((e)=>console.log(e));
  //   };
  //   check();
  // },[])
  
  return (
    // <HomeScreen />
    <NotificationTestScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


