import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import Navigator from "./utilities/Navigator";
import "react-native-gesture-handler";
import React, { useEffect } from 'react';
import * as Location from 'expo-location';


const App = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      // Optionally, get the initial location here if needed for app startup
      const location = await Location.getCurrentPositionAsync({});
      console.log(location); // You can use this location as needed
    })();
  }, []);

  // Rest of your app's render logic
  return (
    // Your app's layout and navigation
    <Navigator /> //init navbar
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
