import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import demoData from './shop_data.json';
import { FontAwesome } from '@expo/vector-icons'; // Import for the star icon




export default function ShopScreenMap() {
  const [selectedShop, setSelectedShop] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 55.6761,
    longitude: 12.5683,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [showDistance, setShowDistance] = useState(false); // New state to control distance display
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      // Update region to user's location
      setRegion({
        ...region, // Keeps the latitudeDelta and longitudeDelta
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);


  const onSelectShop = (shop) => {
    setSelectedShop({ ...shop, reviews: shop.reviews.map(r => ({ ...r, expanded: false })) });
    const newRegion = {
      ...region,
      latitude: shop.geometry.location.lat,
      longitude: shop.geometry.location.lng,
    };
    mapRef.current.animateToRegion(newRegion, 1000);
  };

  const toggleReviewText = (index) => {
    setSelectedShop(prevState => ({
      ...prevState,
      reviews: prevState.reviews.map((r, i) => i === index ? { ...r, expanded: !r.expanded } : r)
    }));
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Haversine formula to calculate distance
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c;
    return distance.toFixed(2);
  };

  // Function to determine if the distance should be shown
  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
    // Example threshold for showing distance: when latitudeDelta is less than 0.05
    setShowDistance(newRegion.latitudeDelta < 0.05);
  };

  return (
    <View style={{ flex: 1 }}>
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={region}
      onRegionChangeComplete={onRegionChangeComplete}
      showsUserLocation={true}
    >
      {demoData.map((shop, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: shop.geometry.location.lat,
            longitude: shop.geometry.location.lng,
          }}
          onPress={() => onSelectShop(shop)}
        >
          <View style={styles.markerContainer}>
            <Ionicons name="ios-cart" size={15} color="red" />
            {userLocation && showDistance && (
              <Text style={styles.distanceText}>
                {calculateDistance(userLocation.latitude, userLocation.longitude, shop.geometry.location.lat, shop.geometry.location.lng)} km
              </Text>
            )}
          </View>
        </Marker>
      ))}
    </MapView>
      {selectedShop && (
        <View style={styles.cardContainer}>
          <Card containerStyle={styles.card}>
            <ScrollView>
              <View style={styles.cardHeader}>
                <Card.Title style={styles.cardTitle}>{selectedShop.name}</Card.Title>
                <TouchableOpacity onPress={() => setSelectedShop(null)} style={styles.closeButton}>
                  <Ionicons name="ios-close" size={30} />
                </TouchableOpacity>
              </View>
              <Card.Divider />
              <Text>{selectedShop.formatted_address}</Text>
              <Text>{selectedShop.formatted_phone_number}</Text>
              <Text>{selectedShop.website}</Text>
              <Rating
                imageSize={20}
                readonly
                startingValue={selectedShop.rating}
                style={{ paddingVertical: 10 }}
              />
              <ScrollView style={styles.reviewsContainer}>
                {selectedShop.reviews.map((review, index) => (
                  <View key={index} style={styles.review}>
                    <Image
                      source={{ uri: review.profile_photo_url }}
                      style={styles.profileImage}
                    />
                    <View style={styles.reviewTextContainer}>
                      <Text style={styles.authorName}>{review.author_name}</Text>
                      <Text>
                        {review.expanded || review.text.length < 100 ? review.text : `${review.text.substring(0, 100)}...`}
                        {review.text.length >= 100 &&
                          <Text style={{ color: 'blue' }} onPress={() => toggleReviewText(index)}>
                            {review.expanded ? ' Se mindre' : ' Se mere'}
                          </Text>
                        }
                      </Text>
                      <View style={styles.reviewFooter}>
                        <Text style={styles.reviewTime}>{review.relative_time_description}</Text>
                        <View style={styles.rating}>
                          <Text style={styles.ratingText}>{review.rating}</Text>
                          <FontAwesome name="star" size={15} color="#FFD700" />
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </ScrollView>
          </Card>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    padding: 10, // Add some padding for easier tapping
  },
  markerContainer: {
    alignItems: 'center', // Centers the content horizontally
    justifyContent: 'center', // Centers the content vertically
    backgroundColor: 'white', // Change as needed
    padding: 3,
    borderRadius: 10,
  },
  distanceText: {
    // Style for the distance text
    fontSize: 10, // Adjust the font size as needed
    marginTop: 2, // Space between the icon and text
  },

  cardContainer: {
    position: 'absolute', 
    bottom: 0, 
    width: '90%', 
    margin: '5%'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10, // Adjust as needed
  },
  card: {
    maxHeight: '95%', 
    overflow: 'hidden'
  },
  reviewsContainer: {
    maxHeight: 350
  },
  review: {
    flexDirection: 'row', 
    marginVertical: 10
  },
  profileImage: {
    width: 50, 
    height: 50, 
    borderRadius: 25
  },
  reviewTextContainer: {
    flex: 1, 
    marginLeft: 10
  },
  authorName: {
    fontWeight: 'bold'
  },
  reviewText: {
    // Styling for the review text
  },
  reviewFooter: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 5
  },
  reviewTime: {
    fontStyle: 'italic'
  },
  rating: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  ratingText: {
    marginRight: 5
  }
});
