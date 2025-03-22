  // src/screens/ListadoScreen.tsx
  import React, { useEffect, useState, useRef } from 'react';
  import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    Animated,
    NativeSyntheticEvent,
    NativeScrollEvent,
    ScrollView,
  } from 'react-native';
  import MultiSlider from '@ptomasroos/react-native-multi-slider';
  import { LinearGradient } from 'expo-linear-gradient';
  import { StackNavigationProp } from '@react-navigation/stack';
  import { RootStackParamList } from '../../App';
  import { ListadoPresenter } from '../presenter/ListadoPresenter';
  import { CuidadorModel } from '../model/CuidadorModel';
  import FooterNavigation from '../componentes/Footer';
  import DynamicImage from '../componentes/DynamicImage';

  const { width, height } = Dimensions.get('window');

  type ListadoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Listado'>;

  type Props = {
    navigation: ListadoScreenNavigationProp;
  };

  const ListadoScreen: React.FC<Props> = ({ navigation }) => {
    const [cuidadores, setCuidadores] = useState<CuidadorModel[]>([]);
    const [categorias, setCategorias] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [textoBusqueda, setTextoBusqueda] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 30]);
    const [horaInicioFilter, setHoraInicioFilter] = useState<string>('');
    const [horaFinFilter, setHoraFinFilter] = useState<string>('');
      const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [favorites, setFavorites] = useState<{ [id: number]: boolean }>({});

    // Animación para modal de filtros (desplegable desde la izquierda)
    const slideAnim = useRef(new Animated.Value(-400)).current;
    const presenter = new ListadoPresenter();
    const isFilterApplied =
    textoBusqueda.trim() !== '' ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 30 ||
    horaInicioFilter.trim() !== '' ||
    horaFinFilter.trim() !== '' ||
    selectedCategories.length > 0;

  // Dentro de tu componente ListadoScreen, define la función resetFilters:
  const resetFilters = () => {
    setTextoBusqueda('');
    setPriceRange([0, 30]);
    setHoraInicioFilter('');
    setHoraFinFilter('');
    setSelectedCategories([]);
    toggleFilters(); // Cierra el modal tras limpiar los filtros
  };


    useEffect(() => {
      const fetchData = async () => {
        console.log('Fetching cuidadores...');
        setLoading(true);
        const cuidadoresData = await presenter.fetchCuidadores();
        console.log('Cuidadores fetched:', cuidadoresData);
        setCuidadores(cuidadoresData);
        const categoriasData = await presenter.fetchCategorias();
        console.log('Categorias fetched:', categoriasData);
        setCategorias(categoriasData);
        setLoading(false);
      };
      fetchData();
    }, []);

    const handleItemPress = (item: CuidadorModel) => {
      console.log('Navigating to Detalle with item:', item);
      navigation.navigate('Detalle', { elemento: item });
    };

    // Función para renderizar las estrellas según el rating (0 a 5)
    const renderStars = (rating: number) => {
      const fullStars = Math.floor(rating);
      const emptyStars = 5 - fullStars;
      return (
        <Text style={styles.starsText}>
          {'★'.repeat(fullStars)}
          {'☆'.repeat(emptyStars)}
        </Text>
      );
    };
    const onHeartPress = (id: number) => {
      setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };
    
    // Render de cada card con ícono de corazón y flecha en la esquina superior derecha del contenido
    const renderCard = ({ item }: { item: CuidadorModel }) => (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.8}
        
      >
      <DynamicImage uri={item.urlImagen} />
      <TouchableOpacity
  style={[styles.heartIconContainer, favorites[item.id] && styles.favoriteBackground]}
  onPress={() => onHeartPress(item.id)}
>
  <Image
    source={
      favorites[item.id]
        ? require('../../assets/white-heart.png')
        : require('../../assets/heart.png')
    }
    style={styles.heartIcon}
  />
</TouchableOpacity>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.nombre}
            </Text>
            <TouchableOpacity style={styles.arrowCircle} onPress={() => handleItemPress(item)}>
              <Image source={require('../../assets/arrow-white.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardSubtitle} numberOfLines={2}>
            {item.direccion}
          </Text>
          <Text style={styles.cardDetail}>${item.precioPorHora} / hr</Text>
          {renderStars(item.rating)}
        </View>
      </TouchableOpacity>
    );

    const filteredCuidadores = cuidadores.filter((item) => {
      const matchesSearch = item.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
      const price = Number(item.precioPorHora);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      
      // Si ambos campos de horario están vacíos, no se filtra por horario.
      // De lo contrario, se chequea que el string del horario del cuidador incluya ambos valores.
      const matchesHorario = (() => {
        if (horaInicioFilter.trim() === '' && horaFinFilter.trim() === '') return true;
        if (!item.horarioAtencion) return false;
        // Se asume que el horario viene en formato "9 - 17"
        const parts = item.horarioAtencion.split('-');
        if (parts.length < 2) return false;
        const caregiverStart = parseInt(parts[0].trim());
        const caregiverEnd = parseInt(parts[1].trim());
        
        // Si solo se ingresa el valor de inicio:
        if (horaInicioFilter.trim() !== '' && horaFinFilter.trim() === '') {
          const filterStart = parseInt(horaInicioFilter);
          if (isNaN(filterStart)) return false;
          return caregiverStart <= filterStart && filterStart <= caregiverEnd;
        }
        
        // Si solo se ingresa el valor de fin:
        if (horaInicioFilter.trim() === '' && horaFinFilter.trim() !== '') {
          const filterEnd = parseInt(horaFinFilter);
          if (isNaN(filterEnd)) return false;
          return caregiverStart <= filterEnd && filterEnd <= caregiverEnd;
        }
        
        // Si se ingresan ambos valores:
        if (horaInicioFilter.trim() !== '' && horaFinFilter.trim() !== '') {
          const filterStart = parseInt(horaInicioFilter);
          const filterEnd = parseInt(horaFinFilter);
          if (isNaN(filterStart) || isNaN(filterEnd)) return false;
          return caregiverStart <= filterStart && caregiverEnd >= filterEnd;
        }
      })();
      
      const matchesCategory =
        selectedCategories.length === 0 ||
        (item.categorias &&
          item.categorias.some((cat: any) => selectedCategories.includes(cat.id)));
    
      return matchesSearch && matchesPrice && matchesHorario && matchesCategory;
    });
    
    // Para "Recomendado para ti", mostramos el cuidador con mejor rating
    const bestRated: CuidadorModel | undefined =
      filteredCuidadores.length > 0
        ? filteredCuidadores.sort((a, b) => b.rating - a.rating)[0]
        : undefined;

    // Para "Más populares": ordenamos por rating descendente
    const popularCuidadores = [...cuidadores].sort((a, b) => {
      if (a.nombre === 'Laura Gimeno Rodriguez') return -1;
      if (b.nombre === 'Laura Gimeno Rodriguez') return 1;
      return b.rating - a.rating;
    });
        console.log('CUIDADORES POPULARES:' +popularCuidadores)
    const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / width);
      setActiveIndex(index);
    };

    const toggleFilters = () => {
      if (!filtersVisible) {
        setFiltersVisible(true);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(slideAnim, {
          toValue: -400,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setFiltersVisible(false);
        });
      }
    };

    // Render de cada categoría (botón seleccionable) para el modal de filtros
    const renderCategoryItem = ({ item }: { item: any }) => {
      const isSelected = selectedCategories.includes(item.id);
      return (
        <TouchableOpacity
          style={[
            styles.categoryButton,
            isSelected && styles.categoryButtonActive,
          ]}
          onPress={() => {
            setSelectedCategories((prev) =>
              prev.includes(item.id)
                ? prev.filter((id) => id !== item.id)
                : [...prev, item.id]
            );
          }}
        >
          <Text
            style={[
              styles.categoryButtonText,
              isSelected && styles.categoryButtonTextActive,
            ]}
          >
            {item.nombre}
          </Text>
        </TouchableOpacity>
      );
    };

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ff9900" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {/* Fondo superior: Imagen de fondo con degradado y border radius inferior */}
        <LinearGradient
          colors={['#ff9900', '#fff']}
          style={styles.backgroundContainer}
        >
          {/* Modal de filtros posicionado absolutamente */}
          {filtersVisible && (
    <Animated.View style={[styles.filtersModal, { transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.modalTitle}>Filtros</Text>
      <Text style={styles.filterLabel}>Precio (mín - máx)</Text>
      <View style={styles.priceRow}>
        <MultiSlider
          values={[priceRange[0], priceRange[1]]}
          sliderLength={width * 0.65}
          onValuesChange={(values: number[]) => setPriceRange([values[0], values[1]])}
          min={0}
          max={30}
          step={1}
          selectedStyle={{ backgroundColor: '#ff9900' }}
          unselectedStyle={{ backgroundColor: '#ccc' }}
          markerStyle={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ff9900',
          }}
        />
        <Text style={styles.priceValueText}>
          ${priceRange[0]} - ${priceRange[1]}
        </Text>
      </View>

      <Text style={styles.filterLabel}>Horario</Text>
      <View style={styles.horarioRow}>
        <TextInput
          style={styles.horarioInput}
          placeholder="Inicio"
          value={horaInicioFilter}
          onChangeText={setHoraInicioFilter}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.horarioInput}
          placeholder="Fin"
          value={horaFinFilter}
          onChangeText={setHoraFinFilter}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.filterLabel}>Categorías</Text>
      <FlatList
        data={categorias}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategoryItem}
        contentContainerStyle={styles.modalCategoriesContainer}
      />
      {/* Agrupar botones en un row */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.modalCloseButton} onPress={toggleFilters}>
          <Text style={styles.modalCloseButtonText}>Aplicar filtros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.resetButtonText}>Limpiar filtros</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )}

          <Image
            source={require('../../assets/listadojpg.jpg')}
            style={styles.backgroundImage}
          />
        </LinearGradient>
        <ScrollView style={[styles.contentContainer, { zIndex: 0 }]}>
    {/* Barra de búsqueda */}
    <View style={styles.searchRow}>
      <TextInput
        style={styles.inputBusqueda}
        placeholder="Buscar..."
        placeholderTextColor="#888"
        value={textoBusqueda}
        onChangeText={setTextoBusqueda}
      />
      <TouchableOpacity style={styles.filtersButton} onPress={toggleFilters}>
        <Image source={require('../../assets/filtrar.png')} style={styles.filtersIcon} />
      </TouchableOpacity>
    </View>

    {isFilterApplied ? (
      // Si hay filtros aplicados, mostramos una FlatList vertical con los resultados filtrados.
    <FlatList
    data={filteredCuidadores}
    scrollEnabled={false} // Desactiva el scroll interno de la FlatList
    showsVerticalScrollIndicator={false}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={{ paddingBottom: 80 }} // Espacio para el footer
    renderItem={({ item }) => (
      <View>
        {renderCard({ item })}
      </View>
    )}
  />

    
    ) : (
      // Si no hay filtros aplicados, mostramos las secciones habituales.
      <>
        <View style={styles.sliderWrapper}>
          <Text style={styles.sectionTitle}>Recomendado para ti</Text>
          {bestRated ? (
            <View style={styles.recommendedCardWrapper}>
              {renderCard({ item: bestRated })}
            </View>
          ) : (
            <Text style={styles.noDataText}>No hay recomendaciones</Text>
          )}
        </View>
        <View style={styles.popularSection}>
          <Text style={styles.sectionTitle}>Más populares</Text>
          <FlatList
            data={popularCuidadores}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sliderContainer}
            renderItem={({ item }) => (
              <View style={styles.sliderCardWrapper}>
                {renderCard({ item })}
              </View>
            )}
          />
        </View>
      </>
    )}
  </ScrollView>

        <FooterNavigation />
      </View>
    );
  };

  const styles = StyleSheet.create({
    sliderContainer: {
      paddingVertical: 20,
      marginBottom: 20,
    },
    sliderCardWrapper: {
      width: width * 0.8,
      marginRight: 30, // Aumenta el espacio entre cards
    },
    
    container: {
      flex: 1,
      backgroundColor: '#fff', // Fondo blanco
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Fondo superior: Imagen de fondo con degradado y border radius inferior
    backgroundContainer: {
      height: height * 0.3, // 30% superior
      width: '100%',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    contentContainer: {
      borderWidth: 2, // Ajusta el grosor según necesites

      borderColor: '#ff9900',
      flex: 1,
      backgroundColor: '#fff', // Fondo blanco
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      marginTop: -30, // Para superponer y suavizar la transición con el fondo
      overflow: 'hidden',
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      marginTop: 25,
    },
    inputBusqueda: {
      flex: 1,
      height: 50,
      paddingHorizontal: 15,
      borderRadius: 25,
      backgroundColor: '#fff',
      fontSize: 16,
      color: '#333',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: 2,
      borderColor: '#ff9900',
    },
    searchButton: {
      marginLeft: 10,
      backgroundColor: '#ff9900',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchIcon: {
      fontSize: 22,
      color: '#fff',
    },
    filtersButton: {
      marginLeft: 10,
      backgroundColor: '#ff9900',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filtersIcon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
    categoriesList: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    categoryButton: {
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      backgroundColor: '#eee',
      marginHorizontal: 10,
      marginVertical: 5,
    },
    categoryButtonActive: {
      backgroundColor: '#ff9900',
    },
    categoryButtonText: {
      fontSize: 16,
      color: '#333',
    },
    categoryButtonTextActive: {
      color: '#fff',
      fontWeight: 'bold',
    },
    sliderWrapper: {
      height: height * 0.3,
      marginBottom: 10,
    },
    recommendedCardWrapper: {
      width: '100%', // La card ocupa el 80% del ancho
      alignSelf: 'center',
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
      textAlign: 'center',
    },
    starsText: {
      fontSize: 16,
      color: '#ff9900', // Color naranja para las estrellas
      textAlign: 'left',
      width: '100%',
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: 'black',
    },
    inactiveDot: {
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    popularSection: {
      marginTop: 90,
    },
    gridContent: {
      paddingBottom: 80,
    },
    columnWrapper: {
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    cardContainer: {
      borderRadius: 15,
      width: '100%',
      height: 350,

    },

    cardContent: {
      alignItems: 'flex-start', // Alinear a la izquierda
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
    },
    
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ff9900', // Nombre en color naranja
      textAlign: 'left',
      width: '100%',
    },
    cardSubtitle: {
      fontSize: 14,
      color: '#777',
      marginVertical: 5,
      textAlign: 'left',
      width: '100%',
    },
    cardDetail: {
      fontSize: 12,
      color: '#555',
      textAlign: 'left',
      width: '100%',
      fontWeight: 'bold',
    },
    arrowCircle: {
      position: 'absolute',
      top: 15,
      right: -35,
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: '#ff9900',
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrowIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    heartIconContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(255,255,255,0.8)',
      width: 40,
      height: 40,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    heartIcon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    filtersModal: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 500, // para cubrir toda la pantalla
      backgroundColor: '#fff',
      padding: 20,
      paddingTop:30,
      zIndex: 999, // valor alto para que esté por encima de todo
      elevation: 10, // si es Android
    },
    
    modalTitle: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color:'#ff9900',
    },
    filterLabel: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5,
      justifyContent: 'space-between',
    },
    priceValueText: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
    },

    modalCloseButton: {
      marginTop: 15,
      padding: 10,
      backgroundColor: '#ff9900',
      borderRadius: 10,
      alignSelf: 'flex-end',
    },
    modalCloseButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    modalCategoriesContainer: {
      paddingVertical: 10,
      justifyContent: 'space-around',
    },
    noDataText: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      marginVertical: 10,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 15,
    },
    
    resetButton: {
      marginTop: 15,
      padding: 10,
      backgroundColor: '#ccc', // o el color que prefieras
      borderRadius: 10,
      alignSelf: 'flex-end',
    },
    resetButtonText: {
      color: '#333',
      fontSize: 16,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height:50,
      paddingBottom:20,
    },
    horarioInput: {
      flex: 1,
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginRight: 5, // Espacio entre inputs; el último puede no necesitar marginRight
    },
    horarioRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    favoriteBackground: {
      backgroundColor: '#ff9900', // naranja que usamos siempre
    },
  });

  export default ListadoScreen;
