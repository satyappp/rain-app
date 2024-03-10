import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

const requestPermissions = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  }
};

console.log("defining bg-task");
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log("Fail",error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log("Success?", locations);
    // do something with the locations captured in the background
  }
});


const PermissionsButton = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async ()=>{
      const backgroundTasks = await TaskManager.getRegisteredTasksAsync();
      setTasks(backgroundTasks);
      console.log(backgroundTasks);
    };
    fetchTasks();
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={requestPermissions} title="Enable background location" />
      <Text>Tasks: {tasks.length}</Text>
      
    </SafeAreaView>
  )};


const styles = StyleSheet.create({}); 

export default PermissionsButton;