import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SaleItem from './SaleItem'; // Assuming SaleItem is in the same directory

const ShopCard = ({ shop }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.shopName}>{shop.name}</Text>
            <FlatList
                horizontal
                data={shop.sales}
                renderItem={({ item }) => <SaleItem sale={item} />}
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        // Add more styles as needed
    },
    shopName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        // Add more styles as needed
    },
    // Add more styles as needed
});

export default ShopCard;
