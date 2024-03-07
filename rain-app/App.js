import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import db from "./src/firebase";
import {useEffect, useState} from "react";

import currentPosition from "./components/location/currentPosition";
import _weeklyWeather from './components/weather/weeklyWeather';
import getUser from "./components/users/restResources";
import dailyWeather from './components/weather/dailyWeather';

export default function App() {
  const { coords, errorMsg } = currentPosition();
  // const weeklyWeather = _weeklyWeather(coords.latitude, coords.longitude);
  // const weatherDisplay = () => {
  //   if (weeklyWeather === null) return "ちょっとまってね";
  //   else return (weeklyWeather[0].coordinates[0].dates[0].value);
  // }
  
  const id = "s78QpvIEffkCLJ1EAdDE";
  const userDisplay = ()=>{
    if (user === null || user === undefined) return "ちょっとまってね";
    else return user.name;
  }
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(id);
      setUser(userData);
    };
    fetchData();
  }, [id]);

  return (
    <View style={styles.container}>
      <Text>Rain App</Text>
      {coords ? (
        <Text>You are now at: {coords.latitude}, {coords.longitude}</Text>
      ) : (
        <Text>Waiting for location...</Text>
      )}
      {/* <Text>
        Weekly weathers:{weatherDisplay()}
      </Text> */}
      <Text>
        name: {userDisplay()}
      </Text>
      <StatusBar style="auto" />
    </View>
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


