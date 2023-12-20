import React, { useContext, useState, useEffect } from 'react';
import { View, Button, Text, FlatList, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../utilities/UserContext';

const categories = ["Music", "Sports", "Technology", "Fashion", "Food"]; // Add more categories as needed

const ProfileScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [selectedCategories, setSelectedCategories] = useState(user?.favorites || []);

  useEffect(() => {
    if (user) {
      // Load user's favorites if they exist
      setSelectedCategories(user.favorites);
    }
  }, [user]);

  const updateFavoritesInAsyncStorage = async (newFavorites) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      let users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Update the favorites for the current user
      users = users.map(u => {
        if (u.username === user.username) {
          return { ...u, favorites: newFavorites };
        }
        return u;
      });

      await AsyncStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleCategoryChange = async (category) => {
    const newFavorites = selectedCategories.includes(category) 
      ? selectedCategories.filter(cat => cat !== category) 
      : [...selectedCategories, category];
  
    setSelectedCategories(newFavorites);
    await updateFavoritesInAsyncStorage(newFavorites); // opdater AsyncStorage
  
    // opdater bruger i context
    const updatedUser = { ...user, favorites: newFavorites };
    setUser(updatedUser);
  
    console.log("Updated to new favorites -> ", newFavorites);
    console.log("user: ", updatedUser); // print den opdaterede bruger
  };

  const handleLogout = () => {
    setUser(null); // fjern gbruger fra global state
  };

  const renderCategory = ({ item }) => (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item}</Text>
      <Switch
        value={selectedCategories.includes(item)}
        onValueChange={() => handleCategoryChange(item)}
      />
    </View>
  );

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Hvad er dine interesser, {user.username}?</Text> 
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={item => item}
        />
        <Button title="Log ud" onPress={handleLogout} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Opret bruger" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
