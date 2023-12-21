import React, { useState, useContext } from 'react';
import { UserContext } from '../../utilities/UserContext';
import { View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import ShopScreenMap from './ShopScreenMap';
import ShopScreen from './ShopScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const MainScreen = () => {
    const { user, setUser } = useContext(UserContext);
    const [clickedItemName, setClickedItemName] = useState(null);
    console.log("User -> ", user)
    const handleMapItemClick = (itemName) => {
        setClickedItemName(itemName); // Set the name of the clicked item
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.nearYouContainer}>
                    <Ionicons name="location-sharp" size={24} color="#333" />
                    <Text style={styles.nearYouText}>Hyggelige butikker i dit område</Text>
                </View>

                {/* Display the name of the clicked item, if any */}
                {clickedItemName && (
                    <View style={styles.clickedItemContainer}>
                        <Text>{clickedItemName}</Text>
                    </View>
                )}

                {/* Other scrollable content can be added here */}

                <View style={styles.mapContainer}>
                    <ShopScreenMap onMapItemClick={handleMapItemClick} />
                </View>

                <View style={styles.nearYouContainer}>
                    <Ionicons name="star" size={24} color="#333" />
                    <Text style={styles.nearYouText}>Tilbud fra dine favoritter</Text>
                </View>

                <View style={styles.mapContainer}>
                    <ShopScreen />
                </View>

                {/* Additional rows of content can be added here */}
            </ScrollView>
        </View>
    );
};

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    scrollView: {
        flex: 1,
    },
    nearYouContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    nearYouText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
        marginLeft: 8,
    },
    mapContainer: {
        width: '100%',
        height: windowHeight * 0.3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    clickedItemContainer: {
        padding: 10,
        alignItems: 'center',
        // Add any additional styling you want for this container
    },
    // ... other styles ...
});

export default MainScreen;