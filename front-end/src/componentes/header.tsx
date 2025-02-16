// src/components/Header.tsx
import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type HeaderProps = {
  username?: string;
  onPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({ username, onPress }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          {username ? `Bienvenido, ${username}` : 'Bienvenido, Invitado'}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../../assets/user-interface.png')}
            style={styles.userImage}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#black',
  },
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
    marginTop: 33,
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
