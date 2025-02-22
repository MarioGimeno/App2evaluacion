export interface ResenasModel {
  id: number;
  comentario: string;
  calificacion: number;
  cuidadorId?: number;
  usuario?: {
    id: number;
    nombre: string;
    foto: string;
  };
}
