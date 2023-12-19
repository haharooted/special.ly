import React, { useEffect, useState } from 'react';
import MapView, { Polygon, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

const GEOJSON_URL = 'https://raw.githubusercontent.com/haharooted/test/main/events.geojson';
const GEOJSON_URL_DATABASE = 'localhost:3000'

const MapScreen = () => {
  const [geoData, setGeoData] = useState(null);
  const route = useRoute();
  const { latitude = 55.67377240048718, longitude = 12.541496086505862 } = route.params || {};

  useEffect(() => { //use effect hook til at init når der trykkes på tab
    const fetchGeoData = async () => {
      try {
        const response = await fetch(GEOJSON_URL);
        const data = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error('Error fetching GeoJSON data', error);
      }
    };

    fetchGeoData();
  }, []);

  return ( // returner container med view i 
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {geoData?.features.map((feature, index) => {
          const { geometry, properties } = feature;
          const { coordinates } = geometry;
          if (geometry.type === 'Polygon') {
            return (
              <Polygon
                key={index}
                coordinates={coordinates[0].map(coord => ({ latitude: coord[1], longitude: coord[0] }))} // current koordinater
                strokeColor="#000"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={1}
              />
            );
          } else if (geometry.type === 'Point') { // hvis det et punkt så tilføj det som "Marker"
            return (
              <Marker
                key={index}
                coordinate={{ latitude: coordinates[1], longitude: coordinates[0] }}
                title={properties.name}
              />
            );
          }
          return null;
        })}
      </MapView>
    </View>
  );
};

// css styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
