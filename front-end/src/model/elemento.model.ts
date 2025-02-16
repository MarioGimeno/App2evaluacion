// src/model/elemento.model.ts
import { ElementoDTO } from "../dto/elemento.dto";

/**
 * Simula la carga asíncrona de una imagen para un elemento dado su id.
 * Devuelve una promesa que se resuelve en la URL de la imagen.
 */
const fetchImagen = (id: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Se utiliza un servicio de placeholder para generar una imagen
      resolve(`https://via.placeholder.com/150?text=Imagen+${id}`);
    }, 500); // Simula un retraso de 500ms
  });
};

/**
 * Función que simula la obtención de datos mediante fetch.
 * Devuelve una promesa que se resuelve en un arreglo de ElementoDTO después de 1 segundo.
 */
export const fetchElementos = (): Promise<ElementoDTO[]> => {
  return new Promise((resolve) => {
    // Datos simulados
    const datosSimulados: ElementoDTO[] = [
      // Casos de videos
      { id: '1', titulo: 'Video: Tutorial de React', descripcion: 'Aprende React de forma sencilla y práctica.' },
      { id: '6', titulo: 'Video: Avanzado en React', descripcion: 'Conceptos avanzados para desarrolladores experimentados.' },
      { id: '9', titulo: 'Video: Fundamentos de JavaScript', descripcion: 'Aprende lo básico de JavaScript y sus aplicaciones.' },
      
      // Casos de eventos
      { id: '2', titulo: 'Evento: Expo Meetup', descripcion: 'Conéctate con la comunidad de Expo y React Native.' },
      { id: '5', titulo: 'Evento: ReactConf', descripcion: 'La conferencia de React más importante del año.' },
      { id: '7', titulo: 'Evento: Meetup de Node.js', descripcion: 'Evento para la comunidad de Node.js y JavaScript.' },
      { id: '10', titulo: 'Evento: Tech Summit 2021', descripcion: 'La cumbre tecnológica del año con múltiples charlas y talleres.' },
      
      // Casos de profesionales
      { id: '3', titulo: 'Profesional: Juan Pérez', descripcion: 'Desarrollador Fullstack con experiencia en React.' },
      { id: '8', titulo: 'Profesional: María López', descripcion: 'Experta en desarrollo móvil y React Native.' },
    ];

    // Cargar las imágenes asíncronamente para cada elemento
    Promise.all(
      datosSimulados.map(async (elemento) => {
        const imagen = await fetchImagen(elemento.id);
        // Se agrega la propiedad imagen a cada objeto
        return { ...elemento, imagen };
      })
    ).then((elementosConImagen) => {
      // Se simula un retraso de 1 segundo para la respuesta final
      setTimeout(() => {
        resolve(elementosConImagen);
      }, 1000);
    });
  });
};
