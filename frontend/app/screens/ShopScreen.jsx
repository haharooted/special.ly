import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import shopData from './shop_data.json'; // Adjust the path as needed
import ShopCard from './ShopCard'; // Assuming ShopCard is in the same directory

export default function ShopScreen() {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        // Filtering shops that have sales
        const shopsWithSales = shopData.filter(shop => shop.sales && shop.sales.length > 0);
        setShops(shopsWithSales);
    }, []);

    return (
        <ScrollView style={styles.container}>
            {shops.map((shop, index) => (
                <ShopCard key={index} shop={shop} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // Add more styles as needed
});
