import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Alert } from 'react-native';
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NearMeScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const exampleEvents = [
    { id: 1, latitude: 55.67377240048718, longitude: 12.541496086505862, event: 'Peter Belli På Hjørnet', iconName: 'musical-notes' },
    { id: 2, latitude: 55.67307240048718, longitude: 12.540496086505862, event: 'Bold i gården', iconName: 'football' },
    { id: 3, latitude: 55.67407240048718, longitude: 12.542496086505862, event: 'Kaffe hos Morten', iconName: 'cafe' },
    { id: 4, latitude: 55.672500, longitude: 12.539800, event: 'Film Night', iconName: 'film' },
    { id: 5, latitude: 55.672000, longitude: 12.539000, event: 'Yoga in the Park', iconName: 'body' },
    { id: 6, latitude: 55.671000, longitude: 12.538000, event: 'Sara at the Museum', iconName: 'person' },
    { id: 7, latitude: 55.670500, longitude: 12.537500, event: 'Book Club Meeting', iconName: 'book' }
  ];

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission til at hente loka gik galt');
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); //get position fra telefonen
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    };

    fetchLocation(); // get positition
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude || 55.67377240048718, // default positition
          longitude: currentLocation?.longitude || 12.541496086505862,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {exampleEvents.map(event => (
          <Marker
            key={event.id}
            coordinate={{ latitude: event.latitude, longitude: event.longitude }}
            title={event.event}
            description={"Join dette event!"}
            icon={<Ionicons name={event.iconName} size={30} color={"#000"} />}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject, // fix til css
  }, 
});

export default NearMeScreen;
