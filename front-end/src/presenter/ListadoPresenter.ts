// src/presenter/listado.presenter.ts
import { Alert } from 'react-native';
import { CuidadorModel } from '../model/CuidadorModel'; // Define un DTO o usa la interfaz que prefieras
import { CategoriaModel } from "../model/CategoriaModel";
import { ipFetch } from '../../config';

/**
 * Presentador para el listado de elementos.
 * Encapsula la lógica para obtener y filtrar datos.
 */
export class ListadoPresenter {
  /**
   * Obtiene todos los cuidadores.
   */
  fetchCuidadores = async (): Promise<CuidadorModel[]> => {
    try {
      console.log(ipFetch);
      const response = await fetch(`http://${ipFetch}:3000/cuidadores`);
      console.log(`http://${ipFetch}:3000/cuidadores`);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cuidadores:', error);
      Alert.alert('Error', 'Ha ocurrido un error al obtener los cuidadores. Por favor, inténtalo de nuevo.');
      return [];
    }
  };

  async fetchCategorias(): Promise<CategoriaModel[]> {
    try {
      const response = await fetch(`http://${ipFetch}:3000/categoria`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categorias:', error);
      Alert.alert('Error', 'Ha ocurrido un error al obtener las categorías. Por favor, inténtalo de nuevo.');
      return [];
    }
  }
}
