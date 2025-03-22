// helpers/notificationHelper.ts
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

/**
 * Define un tipo que solo contenga los datos necesarios para la notificación.
 */
export interface NotificationPayload {
  cuidadorId: number;
  usuarioId: number;
  startTime: Date;
  endTime: Date;
  selectedDays: string[];
}

export const getNotificationPayload = (data: ContratacionData): ContratacionData => {
  return data;
};

