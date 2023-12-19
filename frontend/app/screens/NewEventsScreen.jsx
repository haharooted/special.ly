import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import MapView, { Marker, Callout } from 'react-native-maps';

const EVENTS_DATA_URL = 'https://raw.githubusercontent.com/haharooted/test/main/events.geojson';

const NewEventsScreen = () => {
  const [eventsData, setEventsData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);
  const mapRef = useRef(null);
  const markerRefs = useRef([]);

  const baseDate = new Date(2023, 10, 1); // Base date: November 1, 2023
  const endDate = new Date(2024, 8, 30); // End date: September 30, 2024
  const daysRange = Math.floor((endDate - baseDate) / (1000 * 60 * 60 * 24)); // Number of days between baseDate and endDate

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await fetch(EVENTS_DATA_URL);
        const data = await response.json();
        setEventsData(data.features);
        setFilteredEvents(data.features); // Initially display all events
      } catch (error) {
        console.error('Error fetching events data', error);
      }
    };

    fetchEventsData();
  }, []);

  const filterEvents = (daysOffset) => {
    const currentDate = new Date(baseDate.getTime());
    currentDate.setDate(currentDate.getDate() + daysOffset);

    const filtered = eventsData.filter(event => {
      let startDate = new Date(event.properties.parsed_date_start_0);
      let endDate = new Date(event.properties.parsed_date_end_0);
      return startDate <= currentDate && endDate >= currentDate;
    });

    setFilteredEvents(filtered);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
    filterEvents(value);
  };

  const handleEventPress = (item, index) => {
    const region = {
      latitude: item.geometry.coordinates[1],
      longitude: item.geometry.coordinates[0],
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    mapRef.current.animateToRegion(region, 1000);
    markerRefs.current[index].showCallout();
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={daysRange} // Set the maximum value to the number of days in the range
        step={7} // Move one week at a time
        value={sliderValue}
        onValueChange={handleSliderChange}
      />
      <FlatList
        data={filteredEvents}
        keyExtractor={(item, index) => 'key_' + index}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleEventPress(item, index)}>
            <Text>{item.properties.name}</Text>
            <Text>Start: {new Date(item.properties.parsed_date_start_0).toLocaleDateString()}</Text>
            <Text>Slut: {new Date(item.properties.parsed_date_end_0).toLocaleDateString()}</Text>
          </TouchableOpacity>
        )}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 55.67377240048718,
          longitude: 12.541496086505862,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {filteredEvents.map((event, index) => (
          <Marker
            ref={ref => markerRefs.current[index] = ref}
            key={index}
            coordinate={{
              latitude: event.geometry.coordinates[1],
              longitude: event.geometry.coordinates[0],
            }}
            title={event.properties.name}
          >
            <Callout>
              <View>
                <Text>{event.properties.name}</Text>
                <Text>Start: {new Date(event.properties.parsed_date_start_0).toLocaleDateString()}</Text>
                <Text>Slut: {new Date(event.properties.parsed_date_end_0).toLocaleDateString()}</Text>
                {/* Add more information as needed */}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
  },
  slider: { 
    width: '100%',
    height: 40,
  },
  map: {
    height: '60%',
    width: '100%',
  },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default NewEventsScreen;
