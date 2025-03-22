// src/presenter/LoginPresenter.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../auth/AuthContext';
import { ipFetch } from '../../config';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const useLoginPresenter = (navigation: LoginScreenNavigationProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();

  const handleLogin = async () => {
    try {
      // Realiza la llamada a la API de login
      const response = await fetch(`http://${ipFetch}:3000/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Si la respuesta no es exitosa, lanza un error
        throw new Error('Error en la solicitud de login');
      }

      const data = await response.json();
      console.log('Login exitoso:', data);
      // Log extra para verificar el id recibido
      console.log('ID recibido:', data.id);

      setUser(data);
      // Verifica que el usuario se haya seteado en el contexto
      console.log('Usuario seteado en el contexto:', data);

      navigation.navigate('Listado');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Ha ocurrido un error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
};
