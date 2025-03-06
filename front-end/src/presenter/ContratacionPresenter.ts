// src/presenter/ContratacionPresenter.ts
import { Alert } from 'react-native';

export interface ContratacionData {
  cuidadorId: number;
  selectedDays: string[];
  startTime: Date;
  endTime: Date;
  selectedCategory: string;
  totalPrice: number;
  instructions?: string;
  usuarioId: number;
}

export const saveContratacion = async (data: ContratacionData): Promise<boolean> => {
  try {
    const response = await fetch('http://172.22.2.1:3000/contrataciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error al guardar la contratación:', errorText);
      Alert.alert('Error', 'Ha ocurrido un error al guardar la contratación. Por favor, inténtalo de nuevo.');
      return false;
    }
    console.log('Contratación guardada exitosamente:', await response.json());
    return true;
  } catch (error) {
    console.error('Error en la comunicación con el backend:', error);
    Alert.alert('Error', 'Ha ocurrido un error en la comunicación con el backend.');
    return false;
  }
};

export const updateContratacion = async (data: ContratacionData): Promise<boolean> => {
  try {
    const response = await fetch('http://172.22.2.1:3000/contrataciones/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error al actualizar la contratación:', errorText);
      Alert.alert('Error', 'Ha ocurrido un error al actualizar la contratación. Por favor, inténtalo de nuevo.');
      return false;
    }
    console.log('Contratación actualizada exitosamente:', await response.json());
    return true;
  } catch (error) {
    console.error('Error en la comunicación con el backend:', error);
    Alert.alert('Error', 'Ha ocurrido un error en la comunicación con el backend.');
    return false;
  }
};

export const deleteContratacion = async (contractId: number): Promise<boolean> => {
  try {
    const response = await fetch(`http://172.22.2.1:3000/contrataciones/${contractId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error al borrar la contratación:', errorText);
      Alert.alert('Error', 'Ha ocurrido un error al borrar la contratación. Por favor, inténtalo de nuevo.');
      return false;
    }
    console.log('Contratación borrada exitosamente:', await response.json());
    return true;
  } catch (error) {
    console.error('Error en la comunicación con el backend:', error);
    Alert.alert('Error', 'Ha ocurrido un error en la comunicación con el backend.');
    return false;
  }
};
