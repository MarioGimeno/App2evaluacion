import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../auth/AuthContext';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const useLoginPresenter = (navigation: LoginScreenNavigationProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.140:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data); // Actualiza el contexto con el usuario autenticado
        navigation.navigate('Listado');
      } else {
        console.log('Error en login:', data.message);
      }
    } catch (error) {
      console.log('Error en login:', error);
    }
  };

  return { email, setEmail, password, setPassword, handleLogin };
};
