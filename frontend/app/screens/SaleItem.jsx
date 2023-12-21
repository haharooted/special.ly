import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SaleItem = ({ sale }) => {
    const discountPercentage = Math.round((1 - sale.price / sale.normalPrice) * 100);

    return (
        <View style={styles.item}>
            <Image source={{ uri: sale.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{sale.name}</Text>
            <Text style={styles.price}>{sale.price},- kr</Text>
            <Text style={styles.normalPrice}>{sale.normalPrice},- kr</Text>
            <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{discountPercentage}% rabat</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        width: 150,
        margin: 10,
        // Add more styles as needed
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 5,
        // Add more styles as needed
    },
    name: {
        // Add styles as needed
    },
    price: {
        // Add styles as needed
    },
    normalPrice: {
        textDecorationLine: 'line-through',
        // Add styles as needed
    },
    discountBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 5,
        // Add more styles as needed
    },
    discountText: {
        color: 'white',
        // Add styles as needed
    },
    // Add more styles as needed
});

export default SaleItem;
