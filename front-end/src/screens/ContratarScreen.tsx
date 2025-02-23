// src/screens/ContratarScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import CalendarSelector from '../componentes/CalendarSelector';
import { saveContratacion, updateContratacion } from '../presenter/ContratacionPresenter';
import { useAuth } from '../auth/AuthContext';

type ContratarScreenRouteProp = RouteProp<RootStackParamList, 'Contratar'>;

type Props = {
  route: ContratarScreenRouteProp;
};

const ContratarScreen: React.FC<Props> = ({ route }) => {
  // Se reciben ambos parámetros, pero si no se envían, se utiliza undefined.
  const { cuidador, contract } = route.params || {};
  // Se define currentCuidador a partir de la propiedad cuidador o, en su defecto, de contract.cuidador.
  const currentCuidador = cuidador || contract?.cuidador;
  const isEditing = !!contract;
  // Tipificamos la navegación para que reconozca las rutas definidas en RootStackParamList
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Contratar'>>();
  const { user } = useAuth();

  // Estados inicializados según si se está editando o creando
  const [instructions, setInstructions] = useState<string>(contract ? contract.instructions : '');
  const [selectedCategory, setSelectedCategory] = useState<string>(contract ? contract.selectedCategory : 'Infantil');

  // Calendario: guardamos tanto el objeto de fechas (para el componente) como el array de días
  const [selectedDays, setSelectedDays] = useState<string[]>(contract ? contract.selectedDays : []);
  const [selectedDates, setSelectedDates] = useState<{ [date: string]: boolean }>(
    contract
      ? contract.selectedDays.reduce((acc: any, date: string) => {
        acc[date] = true;
        return acc;
      }, {})
      : {}
  );

  // Horario según el horario de atención del cuidador
  const [minTime, setMinTime] = useState<Date>(new Date());
  const [maxTime, setMaxTime] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(contract ? new Date(contract.startTime) : new Date());
  const [endTime, setEndTime] = useState<Date>(contract ? new Date(contract.endTime) : new Date());
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

  // Precio total
  const [totalPrice, setTotalPrice] = useState<number>(contract ? contract.totalPrice : 0);

  // Al montar, parseamos el horario de atención del cuidador para establecer límites
  useEffect(() => {
    if (currentCuidador && currentCuidador.horarioAtencion) {
      const parts = currentCuidador.horarioAtencion.split('-');
      if (parts.length === 2) {
        const startHour = parseInt(parts[0].trim());
        const endHour = parseInt(parts[1].trim());
        const now = new Date();
        const min = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, 0, 0);
        const max = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, 0, 0);
        setMinTime(min);
        setMaxTime(max);
        // Si no estamos editando, inicializamos startTime y endTime con estos límites
        if (!isEditing) {
          setStartTime(min);
          setEndTime(max);
        }
      }
    }
  }, [currentCuidador, isEditing]);

  // Manejadores para los pickers de hora
  const onStartTimeChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      if (
        selectedDate.getTime() < minTime.getTime() ||
        selectedDate.getTime() > maxTime.getTime()
      ) {
        Alert.alert("Error", "Elija una hora dentro del horario del cuidador");
      } else {
        setStartTime(selectedDate);
      }
    }
  };

  const onEndTimeChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      if (
        selectedDate.getTime() <= startTime.getTime() ||
        selectedDate.getTime() > maxTime.getTime()
      ) {
        Alert.alert("Error", "Elija una hora dentro del horario del cuidador y mayor que la hora de inicio");
      } else {
        setEndTime(selectedDate);
      }
    }
  };

  // Manejo de selección de fechas en el calendario
  const toggleDate = (dateStr: string) => {
    setSelectedDates(prev => {
      const newSelected = { ...prev, [dateStr]: !prev[dateStr] };
      const daysArray = Object.keys(newSelected).filter(key => newSelected[key]);
      setSelectedDays(daysArray);
      return newSelected;
    });
  };

  // Recalcular precio total al cambiar horarios o días
  useEffect(() => {
    const diffHours = (endTime.getTime() - startTime.getTime()) / 3600000;
    if (diffHours > 0 && selectedDays.length > 0 && currentCuidador && currentCuidador.precioPorHora) {
      const price = parseFloat(currentCuidador.precioPorHora);
      setTotalPrice(diffHours * price * selectedDays.length);
    } else {
      setTotalPrice(0);
    }
  }, [startTime, endTime, currentCuidador, selectedDays]);

  const onAccept = () => {
    if (totalPrice <= 0) {
      Alert.alert("Faltan datos", "Por favor, selecciona al menos un día y un horario válido.");
      return;
    }
    // Prepara los datos para la contratación
    const contractData: any = {
      cuidadorId: currentCuidador?.id,
      selectedDays,
      startTime,
      endTime,
      selectedCategory,
      totalPrice,
      instructions,
      usuarioId: user.id,
    };
  
    if (isEditing) {
      if (!contract?.id) {
        Alert.alert("Error", "No se encontró el id de la contratación a modificar");
        return;
      }
      // Se agrega el id para la actualización
      contractData.id = contract.id;
    }
  
    Alert.alert(
      isEditing ? "Confirmar modificación" : "Confirmación",
      isEditing
        ? "¿Estás seguro que quieres modificar la contratación?"
        : "¿Estás seguro que quieres finalizar la contratación?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            let success = false;
            if (isEditing) {
              success = await updateContratacion(contractData);
            } else {
              success = await saveContratacion(contractData);
            }
            if (success) {
              navigation.navigate("Listado");
            } else {
              Alert.alert(
                "Error",
                isEditing
                  ? "No se pudo modificar la contratación. Inténtalo de nuevo."
                  : "No se pudo guardar la contratación. Inténtalo de nuevo."
              );
            }
          },
        },
      ]
    );
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true}>
      {/* Botón de volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/white-arrow-invertida.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Header con imagen de fondo del cuidador */}
      <LinearGradient colors={['#ff9900', '#fff']} style={styles.backgroundContainer}>
        <Image source={{ uri: currentCuidador?.urlImagen }} style={styles.backgroundImage} />
      </LinearGradient>

      {/* Contenedor de contenido */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {isEditing ? "Modificar contratación " : "Contratar a "}
          <Text style={styles.cuidadorName}>{currentCuidador?.nombre}</Text>
        </Text>

        <Text style={styles.label}>Seleccione los días de contratación:</Text>
        <CalendarSelector
  availableWeekDays={
    (
      (cuidador?.dias && cuidador.dias.length > 0)
        ? cuidador.dias
        : (contract?.cuidador?.dias && contract.cuidador.dias.length > 0)
          ? contract.cuidador.dias
          : [{ nombre: "Martes" }, { nombre: "Miércoles" }, { nombre: "Viernes" }]
    ).map((d: any) =>
      d.nombre.charAt(0).toUpperCase() + d.nombre.slice(1).toLowerCase()
    )
  }
  selectedDates={selectedDates}
  onSelectDate={toggleDate}
  // @ts-ignore editable se reconoce en la interfaz actualizada
  editable={true}
/>


        <Text style={styles.label}>Seleccione el horario:</Text>
        <View style={styles.timeContainer}>
          <TouchableOpacity style={styles.timeButton} onPress={() => setShowStartPicker(true)}>
            <Text style={styles.timeButtonText}>
              Inicio: {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeButton} onPress={() => setShowEndPicker(true)}>
            <Text style={styles.timeButtonText}>
              Fin: {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
        </View>
        {showStartPicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            display="spinner"
            onChange={onStartTimeChange}
            minimumDate={minTime}
            maximumDate={maxTime}
          />
        )}
        {showEndPicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            display="spinner"
            onChange={onEndTimeChange}
            minimumDate={minTime}
            maximumDate={maxTime}
          />
        )}

        <Text style={styles.totalPriceText}>Precio Total: ${totalPrice.toFixed(2)}</Text>

        <Text style={styles.label}>Deja indicaciones (opcional):</Text>
        <TextInput
          style={styles.instructionsInput}
          placeholder="Escribe aquí tus indicaciones..."
          multiline
          numberOfLines={4}
          value={instructions}
          onChangeText={setInstructions}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
            <Text style={styles.acceptButtonText}>
              {isEditing ? "Modificar contratación" : "Terminar contratación"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContratarScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  backgroundContainer: {
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -30,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#ff9900',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  cuidadorName: {
    color: '#ff9900',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginVertical: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  timeButton: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ff9900',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  timeButtonText: {
    fontSize: 16,
    color: '#ff9900',
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff9900',
    textAlign: 'center',
    marginVertical: 20,
  },
  instructionsInput: {
    borderWidth: 2,
    borderColor: '#ff9900',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: '#ff9900',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
