import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'; // icons til senere
import { LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
LogBox.ignoreLogs(['No native splash screen registered for given view controller.']);
LogBox.ignoreLogs(['Encountered two children with the same key']);

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
import MainScreen from "../app/screens/MainScreen"; // 
import ShopScreen from "../app/screens/ShopScreen"; // 
import MapScreen from "../app/screens/MapScreen"; // 
//import TableScreen from "../screens/TableScreen"; // 
import CreateEventScreen from "../app/screens/CreateEventScreen"; // 
import FriendsScreen from "../app/screens/FriendsScreen"; // 
import NearMeScreen from "../app/screens/NearMeScreen"; // 
import NewEventsScreen from "../app/screens/NewEventsScreen"; // 
import ShopScreenMap from "../app/screens/ShopScreenMap"; // 
import ProfileScreen from "../app/screens/ProfileScreen"; // 
import LoginScreen from "../app/screens/LoginScreen"; // 

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Min profil" component={ProfileScreen} />
    <ProfileStack.Screen name="Login" component={LoginScreen} />
    {/* Add other screens here if needed */}
  </ProfileStack.Navigator>
);


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
            } else if (route.name === 'Tilbud') {
              iconName = focused ? 'wallet' : 'wallet-outline';
            } else if (route.name === 'Hjem') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Tilbud') {
              iconName = focused ? 'cash' : 'cash-outline';
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
        <Tab.Screen name="Hjem" component={MainScreen} />
        <Tab.Screen name="Tilbud" component={ShopScreen} />
        {/*<Tab.Screen name="Map" component={MapScreen} />*/}
        {/* <Tab.Screen name="venner" component={FriendsScreen} />  */}
        <Tab.Screen name="Butikker" component={ShopScreenMap} />
        <Tab.Screen name="Events" component={NewEventsScreen} />
        <Tab.Screen name="Profil" component={ProfileStackScreen} />


      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
