import React from 'react';
import {useState,useRef, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Constants from 'expo-constants';
import * as Device from "expo-device";
import { useFonts } from 'expo-font';
import BackgroundLocationTask from './screens/backgroundLocationTask';
import HomeScreen from "./screens/homescreen";

projectId = "50ab238d-e05a-44fd-a781-21684e62698f";
Notifications.setNotificationHandler({
  handleNotification: async () => {
    console.log("I've got an notification");
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "通知のタイトル! 📬",
      body: "通知の内容",
      data: { data: "通知のデータ" },
    },
    trigger: { seconds: 2 },
  });
}


async function registerForPushNotificationsAsync() {
  let token;
  console.log(Platform.OS);
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    console.log(finalStatus);
    token = await Notifications.getExpoPushTokenAsync({
      projectId: projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }
  return token.data;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("げっと?");
      setNotification(notification);
    });
    
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("げっと?");
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
   <>
      <HomeScreen />
      <BackgroundLocationTask/>
    </>
  );
}