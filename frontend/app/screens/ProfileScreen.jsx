import React, { useContext, useState, useEffect } from 'react';
import { View, Button, Text, FlatList, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../utilities/UserContext';

//const categories = ["Music", "Sports", "Technology", "Fashion", "Food"]; // eksempler

const categories = [
  "Bager", // 
  "Fiskehandler", // 
  "Slagter", // 
  "Ostehandler", // 
  "Vinhandler", // 
  "Delikatessebutik", // 
  "Tehandel", // 
  "Grønthandler", // 
  "Lædervarebutik", // 
  "Ølhandel", // 
  "Interiørbutik", // 
  "Chokoladebutik", // 
  "Karamelforretning", // 
  "Keramikbutik", // 
  "Spiritusforretning", // 
  "Kunstgalleri", // 
  "Anden specialbutik fx. Italienske specialiteter, Asiatiske specialiteter, mv." // 
];

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
        <Text style={styles.welcomeText}>Hvilke specialbutikker vil du se, {user.username}?</Text> 
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
    <View style={styles.nonLoggedInContainer}>
      <Text style={styles.welcomeMessage}>Velkommen til Specia.ly!</Text>
      <Text style={styles.welcomeMessage2}>... lige om lidt er du helt opdateret på dine lokale specialbutikker!</Text>

      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.actionButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.actionButtonText}>Opret bruger</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light background color
    padding: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333', // Dark text for contrast
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff', // Card-like design for categories
    borderRadius: 10,
    shadowColor: '#000', // Subtle shadow for depth
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007bff', // Stylish button color
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  nonLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Same background as logged in
    padding: 20,
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  welcomeMessage2: {
    fontSize: 15,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#007bff', // Consistent button style
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    minWidth: 200, // Ensuring buttons have a good size
  },
  actionButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});


export default ProfileScreen;
