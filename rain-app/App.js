import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import db from "./src/firebase";
import {useEffect, useState} from "react";
import { useFonts } from 'expo-font';

// import currentPosition from "./components/location/currentPosition";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WeeklyWeather from './components/weather/weeklyWeather';
import getUser from "./components/users/restResources";
import dailyWeather from './components/weather/dailyWeather';
import HomeScreen from './screens/homescreen';
import LoadingScreen from './screens/loadingScreen';
import { getCurrentPosition } from './components/location/currentPosition';


export default function App() {
  // const { coords, errorMsg } = currentPosition();
  // const weeklyWeather = _weeklyWeather(coords.latitude, coords.longitude);
  // const weatherDisplay = () => {
  //   if (weeklyWeather === null) return "ちょっとまってね";
  //   else return (weeklyWeather[0].coordinates[0].dates[0].value);
  // }
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    'KodomoRounded': require('./src/assets/fonts/KodomoRounded.otf'),
  });
  const Stack = createStackNavigator();
  const id = "s78QpvIEffkCLJ1EAdDE";
  const userDisplay = ()=>{
    if (user === null || user === undefined) return "ちょっとまってね";
    else return user.name;
  }
  const [user, setUser] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


