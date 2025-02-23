// src/componentes/CalendarSelector.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

export interface CalendarSelectorProps {
  availableWeekDays: string[]; // e.g. ["Martes", "Jueves", "Viernes"]
  selectedDates: { [date: string]: boolean };
  onSelectDate: (date: string) => void;
  editable?: boolean;
}

const weekDaysMap: { [key: string]: number } = {
  'Domingo': 0,
  'Lunes': 1,
  'Martes': 2,
  'Miércoles': 3,
  'Jueves': 4,
  'Viernes': 5,
  'Sábado': 6,
};

const CalendarSelector: React.FC<CalendarSelectorProps> = ({
  availableWeekDays,
  selectedDates,
  onSelectDate,
  editable = true,
}) => {
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});

  const updateMarkedDates = (month: number, year: number) => {
    let markings: { [date: string]: any } = {};
    // Calcula la cantidad de días del mes
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dateStr = date.toISOString().split('T')[0];
      const weekDayNumber = date.getDay();
      // Solo se habilita si el día es uno de los disponibles
      const isAvailable = availableWeekDays.some(dayName => weekDaysMap[dayName] === weekDayNumber);
      if (isAvailable) {
        markings[dateStr] = {
          customStyles: {
            container: {
              borderWidth: 2,
              borderColor: '#ff9900',
              borderRadius: 16,
              backgroundColor: '#fff',
            },
            text: {
              color: '#ff9900',
            },
          },
          disabled: false,
          disableTouchEvent: false,
        };
      } else {
        markings[dateStr] = {
          disabled: true,
          disableTouchEvent: true,
          customStyles: {
            container: {
              backgroundColor: '#eee',
              borderRadius: 16,
            },
            text: {
              color: '#999',
            },
          },
        };
      }
    }
    // Sobrescribe el marcado de las fechas seleccionadas para que estén habilitadas
    Object.keys(selectedDates).forEach(dateStr => {
      if (selectedDates[dateStr]) {
        markings[dateStr] = {
          customStyles: {
            container: {
              backgroundColor: '#ff9900',
              borderRadius: 16,
            },
            text: {
              color: '#fff',
            },
          },
          disabled: false,
          disableTouchEvent: false,
        };
      }
    });
    setMarkedDates(markings);
  };

  useEffect(() => {
    const now = new Date();
    updateMarkedDates(now.getMonth() + 1, now.getFullYear());
  }, [availableWeekDays, selectedDates]);

  return (
    <Calendar
      markingType={'custom'}
      markedDates={markedDates}
      onDayPress={(day) => {
        if (editable) {
          onSelectDate(day.dateString);
        }
      }}
      onMonthChange={(month) => updateMarkedDates(month.month, month.year)}
      onLayout={() => {
        const now = new Date();
        updateMarkedDates(now.getMonth() + 1, now.getFullYear());
      }}
    />
  );
};

export default CalendarSelector;

const styles = StyleSheet.create({});
