import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'; // icons til senere
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['No native splash screen registered for given view controller.']);

//import FoundationIcon from 'react-native-vector-icons/Foundation';
//import Fontisto from 'react-native-vector-icons/Fontisto';
//import Foundation from 'react-native-vector-icons/Foundation';
//import Ionicons from 'react-native-vector-icons/Ionicons';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import Octicons from 'react-native-vector-icons/Octicons';
//import Zocial from 'react-native-vector-icons/Zocial';
//import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// screenz
import MapScreen from "../app/screens/MapScreen"; // 
import TableScreen from "../app/screens/TableScreen"; // 
import CreateEventScreen from "../app/screens/CreateEventScreen"; // 
import FriendsScreen from "../app/screens/FriendsScreen"; // 
import NearMeScreen from "../app/screens/NearMeScreen"; // 
import NewEventsScreen from "../app/screens/NewEventsScreen"; // 
import ShopScreenMap from "../app/screens/ShopScreenMap"; // 

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Events') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Opret event') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'venner') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'venner') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'venner') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Butikker') {
              iconName = focused ? 'shopping' : 'shopping-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            }
            


            // return component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: [
            {
              display: 'flex'
            },
            null
          ]
        })}
      >
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Opret event" component={CreateEventScreen} />
        <Tab.Screen name="venner" component={FriendsScreen} />
        <Tab.Screen name="Nær mig" component={NearMeScreen} />
        <Tab.Screen name="Events" component={NewEventsScreen} />
        <Tab.Screen name="Butikker" component={ShopScreenMap} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
