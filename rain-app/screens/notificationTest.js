// /* Rectangle 1 */

// box-sizing: border-box;

// position: absolute;
// width: 362.83px;
// height: 205px;
// left: 14px;
// top: 111px;

// background: radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
// backdrop-filter: blur(40px);
// /* Note: backdrop-filter has minimal browser support */
// border-radius: 59px;

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const _requestPermissionsAsync = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) { return }
  
    await Notifications.requestPermissionsAsync();
  };
const scheduleNotificationAsync = async () => {
    console.log("Button Pushed.");
    Notifications.scheduleNotificationAsync({
      content: {
        body: 'test',
        title: "title",
        subtitle: "subtitle",
      },
      trigger: {
        seconds: 1,
      }
    }).then(() => console.log("yatta-")).catch(() => console.log("fuckyou"));
  };

//   _confirmNotificationPermission =   async ()=> {
//     const permission = await Permissions.getAsync(Permissions.NOTIFICATIONS)
//     if (permission.status === 'granted') return true
//     const askResult = await Permissions.askAsync(Permissions.NOTIFICATIONS)
//     return askResult.status === 'granted'
//   }

// _confirmLocationPermission = async ()=> {
//     const permissionIsValid = (permission) => {
//       if (permission.status !== 'granted') return false
//       if (Platform.OS !== 'ios') return true
//       return permission.permissions.location.ios.scope === 'always'
//     };
//     const permission = await Permissions.getAsync(Permissions.LOCATION_FOREGROUND);
//     if (permissionIsValid(permission)) return true;
//     const askResult = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
//     return permissionIsValid(askResult);
//   } 



const NotificationTestScreen = () => {
    React.useEffect(() => {
        _requestPermissionsAsync();
      });
    // state = {
    //     isNotificationPermitted: false,
    //     isLocationPermitted: false,
    // }

    return (
      <View style={styles.container}>
        <Text>Notification Test</Text>

        {/* <Text>Notification Permission: { this.state.isNotificationPermitted ? '○' : '×' }</Text>
        <Text>Location Permission: { this.state.isLocationPermitted ? '○' : '×' }</Text> */}
        <Button
            title='3秒後にプッシュ通知する'
            onPress={scheduleNotificationAsync}
        />
      </View>
    );
  };
  
const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
},
});

export default NotificationTestScreen;
