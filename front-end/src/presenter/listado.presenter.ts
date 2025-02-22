// src/presenter/listado.presenter.ts
import { ElementoDTO } from "../dto/elemento.dto";
import { fetchElementos } from "../model/elemento.model";
// src/presenter/listado.presenter.ts
import { CuidadorModel } from '../model/CuidadorModel'; // Define un DTO o usa la interfaz que prefieras
import { CategoriaModel } from "../model/CategoriaModel";


/**
 * Presentador para el listado de elementos.
 * Encapsula la lógica para obtener y filtrar datos.
 */
export class ListadoPresenter {
  /**
   * Obtiene todos los elementos simulados.
   */
  async obtenerElementos(): Promise<ElementoDTO[]> {
    return await fetchElementos();
  }
   fetchCuidadores = async (): Promise<CuidadorModel[]> => {
    try {
      const response = await fetch('http://192.168.1.140:3000/cuidadores');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cuidadores:', error);
      return [];
    }
  };
  
  async fetchCategorias(): Promise<CategoriaModel[]> {
    try {
      const response = await fetch('http://192.168.1.140:3000/categoria');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categorias:', error);
      return [];
    }
  }
  
  /**
   * Filtra los elementos según el texto de búsqueda.
   * Si hay coincidencias exactas (título o descripción igual al término), se devuelven solo ellas.
   * Si no, se devuelven las coincidencias parciales.
   * @param textoBusqueda Texto ingresado para filtrar.
   * @returns Una promesa que resuelve en un arreglo filtrado de ElementoDTO.
   */
  async obtenerElementosFiltrados(textoBusqueda: string): Promise<ElementoDTO[]> {
    const elementos = await this.obtenerElementos();
    const trimmed = textoBusqueda.trim();
    if (!trimmed) {
      return elementos;
    }
    const busqueda = trimmed.toLowerCase();
  
    // Filtrar únicamente por el título
    const coincidenciasParciales = elementos.filter((item: ElementoDTO) =>
      item.titulo.toLowerCase().includes(busqueda)
    );
  
    // Coincidencia exacta sólo en el título
    const coincidenciasExactas = elementos.filter((item: ElementoDTO) =>
      item.titulo.toLowerCase() === busqueda
    );
  
    // Si existen coincidencias exactas, se devuelven solo ellas; si no, se devuelven las parciales.
    return coincidenciasExactas.length > 0 ? coincidenciasExactas : coincidenciasParciales;
  }
  
}  
