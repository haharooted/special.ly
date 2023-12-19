import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

// event screen, usestate til at holde variabler
const CreateEventScreen = () => {
  const [eventName, setEventName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [time, setTime] = useState('');

  const handleCreateEvent = () => {
    if (eventName && latitude && longitude && time) {
      // fetch fra server
      Alert.alert('OK Added', `Event ${eventName} er lavet.`);
      setEventName('');
      setLatitude('');
      setLongitude('');
      setTime('');
    } else {
      Alert.alert('Mangler noget', 'Fyld det hele ud.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Event Navn"
        value={eventName}
        onChangeText={setEventName} // On change text til at sette event når der kommer input
        style={styles.input}
      />
      <TextInput
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Time"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />
      <Button title="Opret event" onPress={handleCreateEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  input: {
    height: 40,
    borderColor: 'gray', //blue
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
});

export default CreateEventScreen; 
