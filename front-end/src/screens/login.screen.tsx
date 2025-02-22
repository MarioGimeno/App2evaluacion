import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useLoginPresenter } from '../presenter/LoginPresenter';

const { width, height } = Dimensions.get('window');

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { email, setEmail, password, setPassword, handleLogin } = useLoginPresenter(navigation);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/fondo-login.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#fff"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#fff"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.registerText}>
              ¿No tienes cuenta? <Text style={styles.registerLink}>Regístrate</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '60%',
    height: 50,
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#ff9900',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
  },
  registerLink: {
    color: '#ff9900',
    textDecorationLine: 'underline',
  },
});
