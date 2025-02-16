// src/view/ListadoScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListadoPresenter } from '../presenter/listado.presenter';
import { ElementoDTO } from '../dto/elemento.dto';
import { RootStackParamList } from '../../App';
import FooterNavigation from '../componentes/footer'; // Importa el footer

const { width } = Dimensions.get('window');

type ListadoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Listado'>;

type Props = {
  navigation: ListadoScreenNavigationProp;
};

interface CardSliderProps {
  data: ElementoDTO[];
  onItemPress: (item: ElementoDTO) => void;
}

const CardSlider: React.FC<CardSliderProps> = ({ data, onItemPress }) => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.cardSliderContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onItemPress(item)}
          activeOpacity={0.8}
          style={styles.cardContainer}
        >
          <Image
            source={require('../../assets/icon.png')}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.titulo}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const ListadoScreen: React.FC<Props> = ({ navigation }) => {
  const [textoBusqueda, setTextoBusqueda] = useState<string>('');
  const [elementos, setElementos] = useState<ElementoDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const presenter = new ListadoPresenter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await presenter.obtenerElementos();
      setElementos(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredElements = elementos.filter((item) =>
    item.titulo.toLowerCase().includes(textoBusqueda.toLowerCase())
  );

  const handleItemPress = (item: ElementoDTO) => {
    navigation.navigate('Detalle', { elemento: item });
  };

  const renderListItem = ({ item }: { item: ElementoDTO }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('Detalle', { elemento: item })}
    >
      <Image
        source={require('../../assets/icon.png')}
        style={styles.listItemImage}
      />
      <Text style={styles.listItemTitle}>{item.titulo}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.contenedor}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      {/* Contenido principal */}
      <TextInput
        style={styles.inputBusqueda}
        placeholder="Buscar..."
        placeholderTextColor="#888"
        value={textoBusqueda}
        onChangeText={setTextoBusqueda}
      />
      <View style={styles.sliderWrapper}>
        <CardSlider data={elementos} onItemPress={handleItemPress} />
      </View>
      <FlatList
        data={filteredElements}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      {/* Footer de navegación */}
      <FooterNavigation />
    </View>
  );
};

export default ListadoScreen;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 10, // Espacio para el status bar
  },
  inputBusqueda: {
    height: 50,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    color: '#333',
  },
  sliderWrapper: {
    height: 240,
  },
  cardSliderContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: width * 0.8,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listItemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'cover',
  },
  listItemTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});
