// src/presenter/ContratacionPresenter.ts
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
      const response = await fetch('http://192.168.1.140:3000/contrataciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.error('Error al guardar la contratación:', await response.text());
        return false;
      }
      console.log('Contratación guardada exitosamente:', await response.json());
      return true;
    } catch (error) {
      console.error('Error en la comunicación con el backend:', error);
      return false;
    }
  };
  export const updateContratacion = async (data: ContratacionData): Promise<boolean> => {
    try {
      const response = await fetch('http://192.168.1.140:3000/contrataciones/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.error('Error al guardar la contratación:', await response.text());
        return false;
      }
      console.log('Contratación guardada exitosamente:', await response.json());
      return true;
    } catch (error) {
      console.error('Error en la comunicación con el backend:', error);
      return false;
    }
  };
  // src/presenter/ContratacionPresenter.ts
export const deleteContratacion = async (contractId: number): Promise<boolean> => {
  try {
    const response = await fetch(`http://192.168.1.140:3000/contrataciones/${contractId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error('Error al borrar la contratación:', await response.text());
      return false;
    }
    console.log('Contratación borrada exitosamente:', await response.json());
    return true;
  } catch (error) {
    console.error('Error en la comunicación con el backend:', error);
    return false;
  }
};

  