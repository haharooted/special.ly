import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const events = [
  { id: '1', name: 'Udendørskoncert', latitude: 55.65, longitude: 12.5 },
  { id: '2', name: 'Ølsmagning', latitude: 55.56, longitude: 12.4 },
  // Tilføj flere demo events her... 
];


// table screen
const TableScreen = () => {
    const navigation = useNavigation();
  
    const openLocation = (latitude, longitude) => {
      navigation.navigate('Map', { latitude, longitude });
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.eventName}>{item.name}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Gå til kortet!"
                  color="#007AFF"
                  onPress={() => openLocation(item.latitude, item.longitude)} //openlocation  popper loc på kort
                />
              </View>
            </View>
          )}
        />
      </View>
    );
  };
  
  // css template
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f2f2f2',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      marginBottom: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 3,
    },
    eventName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonContainer: {
      backgroundColor: '#f2f2f2',
      borderRadius: 4,
      overflow: 'hidden',
    },
  });
  
  export default TableScreen;
  