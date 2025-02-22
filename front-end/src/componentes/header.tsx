// src/components/Header.tsx
import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../auth/AuthContext'; // Asegúrate de la ruta correcta

type HeaderNavigationProp = StackNavigationProp<RootStackParamList, 'Listado'>;

const Header: React.FC = () => {
  const navigation = useNavigation<HeaderNavigationProp>();
  const { user } = useAuth();

  const handleUserPress = () => {
    if (user) {
      // Si hay usuario logueado, podrías navegar a un perfil o similar.
      //navigation.navigate('Profile'); // O la pantalla que corresponda
    } else {
      // Si no hay sesión iniciada, navega a Login.
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          {user ? `Bienvenido, ${user.nombre}` : 'Bienvenido, Usuario'}
        </Text>
        <TouchableOpacity onPress={handleUserPress}>
          <Image
            source={
              user && user.imageUrl
                ? { uri: user.imageUrl }
                : require('../../assets/user-interface.png')
            }
            style={styles.userImage}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {},
  headerContainer: {
    height: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
