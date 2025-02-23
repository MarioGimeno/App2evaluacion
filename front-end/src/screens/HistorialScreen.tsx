import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/AuthContext';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { deleteContratacion } from '../presenter/ContratacionPresenter';

const HistorialScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    const fetchContracts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://192.168.1.140:3000/contrataciones/usuario/${user.id}`);
        const data = await response.json();
        setContracts(data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, [user, navigation]);

  const handleDelete = (contractId: number) => {
    Alert.alert(
      'Confirmar borrado',
      '¿Estás seguro de que deseas borrar esta contratación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteContratacion(contractId);
            if (success) {
              setContracts(prev => prev.filter(c => c.id !== contractId));
              console.log('Contratación borrada con id:', contractId);
            } else {
              Alert.alert("Error", "No se pudo borrar la contratación. Inténtalo de nuevo.");
            }
          },
        },
      ]
    );
  };

  const handleViewMore = (contract: any) => {
    navigation.navigate("Contratar", { contract });
  };

  if (!user) return null;

  return (
    <View style={styles.container}>
      {/* Botón para volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/white-arrow-invertida.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Historial</Text>
      {loading ? (
        <Text>Cargando...</Text>
      ) : contracts.length === 0 ? (
        <Text>No tienes contrataciones registradas.</Text>
      ) : (
        <FlatList
          data={contracts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const formattedStartTime = new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const formattedEndTime = new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const formattedDates = item.selectedDays
              .map((dateStr: string) => {
                const [year, month, day] = dateStr.split('-');
                return `${day}/${month}/${year}`;
              })
              .join('\n');
            return (
              <View style={styles.contractCard}>
                {/* Encabezado: Nombre del cuidador y botón borrar */}
                <View style={styles.contractHeader}>
                  <Text style={styles.contractTitle}>
                    {item.cuidador?.nombre || 'Sin cuidador asignado'}
                  </Text>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Image source={require('../../assets/trash.png')} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
                {/* Imagen del cuidador */}
                {item.cuidador && item.cuidador.urlImagen ? (
                  <Image source={{ uri: item.cuidador.urlImagen }} style={styles.cuidadorImage} />
                ) : (
                  <Image source={require('../../assets/user-interface.png')} style={styles.cuidadorImage} />
                )}
                {/* Fechas */}
                <View>
  <Text style={styles.contractDates}>Fechas de contratación:</Text>
  {formattedDates.split('\n').map((date, index) => (
    <Text key={index} style={[styles.boldText, styles.dateLine]}>
      {date}
    </Text>
  ))}
</View>

                {/* Total */}
                <Text style={styles.contractDetail}>
                  Total: <Text style={styles.boldText}>${item.totalPrice.toFixed(2)}</Text>
                </Text>
                {/* Horario (última fila) */}
                <Text style={styles.contractTime}>
                  Horario: {formattedStartTime} - {formattedEndTime}
                </Text>
                {/* Botón "Ver más" en posición absoluta */}
                <TouchableOpacity style={styles.viewMoreButton} onPress={() => handleViewMore(item)}>
                  <Text style={styles.viewMoreButtonText}>Ver más</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default HistorialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 20,
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
    color: '#ff9900',
    marginBottom: 20,
    textAlign: 'center',
  },
  contractCard: {
    position: 'relative', // Necesario para el posicionamiento absoluto del botón
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  contractHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  contractTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff9900',
  },
  trashIcon: {
    width: 24,
    height: 24,
    tintColor: '#ff9900',
    resizeMode: 'contain',
  },
  cuidadorImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
 
  contractDates: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },

  dateLine: {
    marginBottom: 4,// margen entre cada fecha
    fontSize: 14,
  },
  contractDetail: {
    fontSize: 14,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
  },
  contractTime: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 5,
  },
  viewMoreButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#ff9900',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  viewMoreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
