import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

export interface ResenaData {
  cuidadorId: number;
  comentario: string;
  calificacion: number;
  usuarioId: number;
}

type DetalleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detalle'>;

export const useResenaPresenter = (navigation: DetalleScreenNavigationProp) => {
  const [resenaData, setResenaData] = useState<ResenaData>({
    cuidadorId: 0,
    comentario: '',
    calificacion: 0,
    usuarioId: 0,
  });

  const setField = (field: keyof ResenaData, value: any) => {
    setResenaData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const loadResenas = async (cuidadorId: number) => {
    try {
      const response = await fetch(`http://172.22.2.1:3000/resena/cuidador/${cuidadorId}`);
      const resenas = await response.json();
      if (!response.ok) {
        console.error('Error al cargar reseñas:', resenas.message);
      } else {
        console.log('Reseñas cargadas exitosamente:', resenas);
        // Aquí podrías actualizar el estado o hacer algo con las reseñas cargadas
      }
    } catch (error) {
      console.error('Error en la comunicación con el backend al cargar reseñas:', error);
    }
  };
  const handleSubmitResena = async (dataToSend: ResenaData) => {
    console.log('reseña data ' + dataToSend.usuarioId);
    try {
      const response = await fetch('http://172.22.2.1:3000/resena', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Error al enviar reseña:', data.message);
        return false;
      } else {
        console.log('Reseña enviada exitosamente:', data);
        return true;
      }
    } catch (error) {
      console.error('Error en la comunicación con el backend:', error);
      return false;
    }
  };
  

  return { resenaData, setField, handleSubmitResena, loadResenas };
};
