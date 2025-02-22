// src/screens/SplashScreen.tsx
import React, { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

const { width, height } = Dimensions.get('window');

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const videoRef = useRef<Video>(null);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../assets/background-video-splash.mp4')}
        style={styles.backgroundVideo}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isMuted
        isLooping
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Cuidado y Compañía</Text>
        <Text style={styles.subtitle}>¿Necesitas un cuidador?</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Listado')}
        >
          <Text style={styles.buttonText}>Empieza ya</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // Coloca el contenido en la parte inferior
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay semitransparente
    paddingHorizontal: 20,
    paddingBottom: 60, // Espacio extra desde abajo
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 25,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  button: {
    backgroundColor: '#ff9900',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
