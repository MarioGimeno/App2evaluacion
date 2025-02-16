// src/components/FooterNavigation.tsx
import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FooterNavigation: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const animationHeight = useRef(new Animated.Value(60)).current; // Altura inicial

  const toggleFooter = () => {
    Animated.timing(animationHeight, {
      toValue: expanded ? 60 : 200, // Si está expandido, vuelve a 60; si no, expande a 200
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // No se puede usar para 'height'
    }).start();
    setExpanded(!expanded);
  };

  return (
    // Al establecer pointerEvents según el estado, evitamos que el fondo bloquee toques.
    <Animated.View
      style={[styles.footerContainer, { height: animationHeight }]}
      pointerEvents={expanded ? 'auto' : 'box-none'}
    >
      {/* El botón toggle lo envolvemos en una vista con pointerEvents 'auto' para que siempre sea interactivo */}
      <View style={styles.toggleButtonContainer} pointerEvents="auto">
        <TouchableOpacity style={styles.toggleButton} onPress={toggleFooter}>
          <Ionicons name={expanded ? "close" : "menu"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {expanded && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Buscar')}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Inicio')}>
            <Ionicons name="home" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Configuración')}>
            <Ionicons name="settings" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

export default FooterNavigation;

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    paddingTop: 10,
  },
  toggleButtonContainer: {
    // Esta vista garantiza que el botón toggle siempre reciba toques.
    pointerEvents: 'auto',
  },
  toggleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  optionButton: {
    padding: 10,
  },
});
