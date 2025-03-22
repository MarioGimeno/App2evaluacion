// src/presenter/RegistroPresenter.ts
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { RegistroData } from '../model/RegistroModel';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../auth/AuthContext'; // Asegúrate de la ruta correcta
import { ipFetch } from '../../config';

type RegistroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Registro'>;

export const useRegistroPresenter = (navigation: RegistroScreenNavigationProp) => {
  const [registroData, setRegistroData] = useState<RegistroData>({
    nombre: '',
    email: '',
    image: null,
    password: '',
  });

  const { setUser } = useAuth(); // Extraemos el setUser del contexto

  const setField = (field: keyof RegistroData, value: string | null) => {
    setRegistroData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requieren permisos para acceder a la galería.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setField('image', result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append('nombre', registroData.nombre);
    formData.append('email', registroData.email);
    formData.append('password', registroData.password);
    if (registroData.image) {
      const filename = registroData.image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : 'image';
      formData.append('image', {
        uri: registroData.image,
        name: filename,
        type,
      } as any);
    }

    try {
      const response = await fetch(`http://${ipFetch}:3000/usuarios/registro`, {
        method: 'POST',
        body: formData,
        // Quita el header 'Content-Type' para FormData en React Native
      });

      if (!response.ok) {
        // Si la respuesta no es exitosa, lanza un error para entrar en el catch
        throw new Error('Error en la solicitud de registro');
      }

      const data = await response.json();
      console.log('Registro exitoso:', data);
      // Actualiza el contexto con el usuario logueado
      setUser(data);
      navigation.navigate('Listado');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.');
    }
  };

  return {
    registroData,
    setField,
    pickImage,
    handleRegister,
  };
};
