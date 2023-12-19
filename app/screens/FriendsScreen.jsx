import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Modal, Text, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // brug awesome icosn si stedet?

// friend screen
const FriendsScreen = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const friendsData = [ // Denne kan fetches fra sqlite database i stedet
    { id: 1, latitude: 55.673772, longitude: 12.541496, event: 'Peter Belli På Hjørnet', iconName: 'musical-notes' },
    { id: 2, latitude: 55.673072, longitude: 12.540496, event: 'Bold i gården', iconName: 'football' },
    { id: 3, latitude: 55.674072, longitude: 12.542496, event: 'Kaffe hos Morten', iconName: 'cafe' },
    { id: 4, latitude: 55.682, longitude: 12.551, event: 'Brunch ved søen', iconName: 'fast-food' },
    { id: 5, latitude: 55.679, longitude: 12.537, event: 'Gruppemøde ved biblioteket', iconName: 'people' },
    { id: 6, latitude: 55.676, longitude: 12.545, event: 'Anne på Strøget', iconName: 'person' },
    { id: 7, latitude: 55.671, longitude: 12.549, event: 'Film i parken', iconName: 'film' },
    { id: 8, latitude: 55.684, longitude: 12.532, event: 'Thomas i Tivoli', iconName: 'person' },
    { id: 9, latitude: 55.670, longitude: 12.536, event: 'Bogklub ved universitetet', iconName: 'book' },
    { id: 10, latitude: 55.675, longitude: 12.550, event: 'Yoga ved havnen', iconName: 'body' }
]; //todo tilføj mere
const friendsLocationData = [
  { 
    id: 11, 
    latitude: 55.677, 
    longitude: 12.543, 
    friend: 'Sebastian', 
    events: [
      {name: 'Fest i parken', time: 'Fredag 19:00'},
      {name: 'Film nat i kirken', time: 'Torsdag 22:00'}
    ]
  },
  { 
    id: 12, 
    latitude: 55.679, 
    longitude: 12.548, 
    friend: 'Sophia', 
    events: [
      {name: 'Yoga ved havnen', time: 'Fredag 08:00'},
      {name: 'Morgenkaffe på cafeen', time: 'Onsdag 19:00'}
    ]
  },
  { 
    id: 13, 
    latitude: 55.676, 
    longitude: 12.544, 
    friend: 'Sebastian G',  
    events: [
      {name: 'Bogmøde på biblioteket', time: 'Fredag/Mandag 15:00'},
      {name: 'Fodbold med venner', time: '17:30'}
    ]
  },
  { 
    id: 14, 
    latitude: 55.674, 
    longitude: 12.540, 
    friend: 'Emma', 
    events: [
      {name: 'Middag med familien', time: '20:00'},
      {name: 'Nat gåtur i byen', time: '23:00'}
    ]
  },
  { 
    id: 15, 
    latitude: 55.678, 
    longitude: 12.547, 
    friend: 'Jonas', 
    events: [
      {name: 'Arbejde i coworking space', time: '09:00'},
      {name: 'Frokost med kollega', time: '12:30'}
    ]
  },
  { 
    id: 16, 
    latitude: 55.675, 
    longitude: 12.542, 
    friend: 'Olivia', 
    events: [
      {name: 'Shopping i bymidten', time: '14:00'},
      {name: 'Aftensmad på restaurant', time: '19:30'}
    ]
  },
];

const renderEvent = ({ item }) => (
  <View style={{ padding: 10 }}>
    <Text>{item.name} at {item.time}</Text>
  </View>
);

return (
  <View style={styles.container}>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 55.67377240048718,
        longitude: 12.541496086505862,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {friendsData.map(friendEvent => ( // Map for at spræde eventsne ud og parse dem
        <Marker
          key={friendEvent.id}
          coordinate={{ latitude: friendEvent.latitude, longitude: friendEvent.longitude }}
          title={friendEvent.event}
        >
          <Ionicons name={friendEvent.iconName} size={30} color="blue" /> 
        </Marker>
      ))}

      {friendsLocationData.map(friendLoc => ( // parse friendslocationdata
        <Marker
          key={friendLoc.id}
          coordinate={{ latitude: friendLoc.latitude, longitude: friendLoc.longitude }}
          title={friendLoc.friend}
          description={"Current location"}
          onPress={() => {
            setSelectedFriend(friendLoc);
            setModalVisible(true);
          }}
        >
          <Ionicons name="person" size={30} color="green" />
        </Marker>
      ))}
    </MapView>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.modalView}>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{selectedFriend?.friend}'s Kommende Events</Text>
        <FlatList
          data={selectedFriend?.events}
          renderItem={renderEvent}
          keyExtractor={item => item.name}
        />
        <Text style={{ marginTop: 10, color: 'blue' }} onPress={() => setModalVisible(false)}>
          Close
        </Text>
      </View>
    </Modal>
  </View>
);
};

const styles = StyleSheet.create({ //create css
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
map: {
  ...StyleSheet.absoluteFillObject,
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
});

export default FriendsScreen;
