// src/screens/RegistroScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useRegistroPresenter } from '../presenter/RegistroPresenter';

const { width, height } = Dimensions.get('window');

type RegistroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Registro'>;

type Props = {
  navigation: RegistroScreenNavigationProp;
};

const RegistroScreen: React.FC<Props> = ({ navigation }) => {
  const { registroData, setField, pickImage, handleRegister } = useRegistroPresenter(navigation);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Text style={styles.stepTitle}>Primero dinos tu nombre</Text>
            <TextInput
              placeholder="Nombre"
              placeholderTextColor="#fff"
              style={styles.input}
              value={registroData.nombre}
              onChangeText={(text) => setField('nombre', text)}
            />
          </>
        );
      case 1:
        return (
          <>
            <Text style={styles.stepTitle}>Tu correo electrónico</Text>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#fff"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={registroData.email}
              onChangeText={(text) => setField('email', text)}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.stepTitle}>Selecciona una imagen</Text>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>Seleccionar imagen</Text>
            </TouchableOpacity>
            {registroData.image && (
              <Image source={{ uri: registroData.image }} style={styles.selectedImage} />
            )}
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.stepTitle}>Contraseña</Text>
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#fff"
              style={styles.input} // Utilizamos el estilo input con borderRadius
              secureTextEntry
              value={registroData.password}
              onChangeText={(text) => setField('password', text)}
            />
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.stepTitle}>Revisa tus datos</Text>
            <TextInput
              placeholder="Nombre"
              placeholderTextColor="#fff"
              style={styles.input}
              value={registroData.nombre}
              onChangeText={(text) => setField('nombre', text)}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#fff"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={registroData.email}
              onChangeText={(text) => setField('email', text)}
            />
            <View style={styles.passwordRow}>
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#fff"
                style={styles.input} // Conserva el borderRadius
                secureTextEntry={!showPassword}
                value={registroData.password}
                onChangeText={(text) => setField('password', text)}
              />
              <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeButton}>
                <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>Cambiar imagen</Text>
            </TouchableOpacity>
            {registroData.image && (
              <Image source={{ uri: registroData.image }} style={styles.selectedImage} />
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/fondo-login.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Registro</Text>
          {renderStep()}
          <View style={styles.navigationButtons}>
            {currentStep > 0 && (
              <TouchableOpacity style={styles.navButton} onPress={prevStep}>
                <Text style={styles.navButtonText}>Anterior</Text>
              </TouchableOpacity>
            )}
            {currentStep < 4 ? (
              <TouchableOpacity
                style={currentStep === 0 ? styles.navButtonCentered : styles.navButton}
                onPress={nextStep}
              >
                <Text style={styles.navButtonText}>Siguiente</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Registrar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegistroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width,
    height,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente el contenido
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  imageButton: {
    backgroundColor: '#ff9900',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 15,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  navButton: {
    backgroundColor: '#ff9900',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  navButtonCentered: {
    backgroundColor: '#ff9900',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 5,
    alignSelf: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#ff9900',
    paddingVertical: 12,
    paddingHorizontal: 20,   
     borderRadius: 25,
    alignSelf: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 15,
  },
  eyeButton: {
    height:30,
    marginLeft: 10,
    marginBottom: 25,
    // Sin borderRadius ni fondo
  },
  eyeText: {
    fontSize: 25,
  },
});
