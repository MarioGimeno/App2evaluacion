import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/AuthContext';

const FooterNavigation: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const handleCentralPress = () => {
    if (!user) {
      navigation.navigate('Login');
    } 
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Home pressed')}>
        <Ionicons name="home-outline" size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Ubicación pressed')}>
        <Ionicons name="location-outline" size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.centralButton} onPress={handleCentralPress}>
        {user && user.imageUrl ? (
          <Image source={{ uri: user.imageUrl }} style={styles.userImage} />
        ) : (
          <Ionicons name="person-outline" size={30} color="#ff9900" />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Historial pressed')}>
        <Ionicons name="time-outline" size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Configuración pressed')}>
        <Ionicons name="settings-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default FooterNavigation;

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    height: 60,
    backgroundColor: '#ff9900',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
  },
  optionButton: {
    padding: 8,
  },
  centralButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    borderWidth: 2,
    borderColor: '#ff9900',
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
