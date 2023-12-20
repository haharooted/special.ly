import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from "react-native";
import Navigator from "./utilities/Navigator";
import { UserProvider } from './utilities/UserContext';
import * as Location from 'expo-location/src/Location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  useEffect(() => {
    // Request location permissions and log initial location
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
    })();

    // Initialize mock data in AsyncStorage
    initializeMockData();
  }, []);

  // Initialize AsyncStorage with mock user data
  const initializeMockData = async () => {
    const mockUsers = [
      { username: "Jens", password: "j", favorites: ["category1", "category2"] },
      { username: "Mai", password: "m", favorites: ["category3", "category4"] }
    ];
    console.log("Updating mock data...");
  
    try {
      const storedUsersString = await AsyncStorage.getItem('users');
      let storedUsers = storedUsersString ? JSON.parse(storedUsersString) : [];
  
      // Update or add mock users
      mockUsers.forEach(mockUser => {
        const index = storedUsers.findIndex(u => u.username === mockUser.username);
        if (index !== -1) {
          // Update existing user
          storedUsers[index] = mockUser;
        } else {
          // Add new mock user
          storedUsers.push(mockUser);
        }
      });
  
      await AsyncStorage.setItem('users', JSON.stringify(storedUsers));
      console.log("Mock users updated in AsyncStorage.");
    } catch (error) {
      console.error('Failed to update mock user data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <Navigator />
      </UserProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
