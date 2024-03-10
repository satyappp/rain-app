import React from 'react';
import {useState,useRef, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Platform } from 'react-native';
// import * as Permissions from 'expo-permissions';
// import { Notifications } from "expo-notifications"
import * as Notifications from 'expo-notifications';
// import { Notification } from 'expo/build/Notifications/Notifications.types'
import * as Constants from 'expo-constants';
import * as Device from "expo-device";
import PermissionsButton from './screens/taskManagerButton';
import UserLocation from './screens/userLocation';
import HomeScreen from "./screens/homescreen";

projectId = "50ab238d-e05a-44fd-a781-21684e62698f";
// const getNotificationToken = async ()=>{
//   console.log("hello world");
//   // projectIdが必要 of eas?
//   const token = await Notifications.getExpoPushTokenAsync({
//     'projectId': projectId,
//     // 'projectId': Constants.expoConfig.extra.eas.projectId,
//   });
//   console.log(token);
//   return token;
// };
// getNotificationToken().then(res => console.log("token:"+res)).catch(e=>console.log(e.message));

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  console.log("通知するしんよ～");
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then(res=>console.log(res)).catch(e => console.log(e));
}

async function registerForPushNotificationsAsync() {
  let token;
  console.log(Platform);
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
      // projectId: Constants.expoConfig.extra.eas.projectId,
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
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
    //   <Text>Your expo push token: {expoPushToken}</Text>
    //   <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>Title: {notification && notification.request.content.title} </Text>
    //     <Text>Body: {notification && notification.request.content.body}</Text>
    //     <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
    //   </View>
    //   <Button
    //     title="Press to Send Notification"
    //     onPress={async () => {
    //       await sendPushNotification(expoPushToken);
    //     }}
    //   />
    // </View>
    <>
      <HomeScreen />
      <UserLocation/>
    </>
  );
}