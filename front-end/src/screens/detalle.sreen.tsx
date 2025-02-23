// src/screens/detalle.screen.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { ResizeMode, Video } from 'expo-av';
import { useAuth } from '../../src/auth/AuthContext';
import { useResenaPresenter } from '../presenter/ResenaPresenter';
import YoutubePlayer from 'react-native-youtube-iframe';

// Declaramos el tipo de la ruta para esta pantalla
type DetalleScreenRouteProp = RouteProp<RootStackParamList, 'Detalle'>;

// Tipamos la navegación para esta pantalla
import { StackNavigationProp } from '@react-navigation/stack';
import LazyYoutubePlayer from '../componentes/LazyYoutubePlayer';
type DetalleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detalle'>;

type Props = {
  route: DetalleScreenRouteProp;
};

const { width } = Dimensions.get('window');

const DetalleScreen: React.FC<Props> = ({ route }) => {
  const { elemento } = route.params;
  const videoRef = useRef<Video>(null);
  // Obtén navigation tipado dentro del componente
  const navigation = useNavigation<DetalleScreenNavigationProp>();
  const { user } = useAuth();

  // Estado para guardar las reseñas actualizadas
  const [resenas, setResenas] = useState<any[]>(elemento.resenas || []);

  // Orden de la semana
  const diasOrden = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const diasOrdenados = elemento.dias && elemento.dias.length > 0
    ? [...elemento.dias].sort((a, b) => diasOrden.indexOf(a.nombre) - diasOrden.indexOf(b.nombre))
    : [];

  const { resenaData, setField, handleSubmitResena, loadResenas } = useResenaPresenter(navigation);

  // Actualiza el cuidadorId en el estado de la reseña
  useEffect(() => {
    if (elemento.id && resenaData.cuidadorId !== elemento.id) {
      setField('cuidadorId', elemento.id);
    }
  }, [elemento.id]);

  // Función para cargar las reseñas y actualizar el estado local
  const fetchResenas = async (cuidadorId: number) => {
    try {
      const response = await fetch(`http://192.168.1.140:3000/resena/cuidador/${cuidadorId}`);
      const data = await response.json();
      console.log('Reseñas cargadas exitosamente:', data);
      setResenas(data);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    }
  };

  // Carga las reseñas al montar la pantalla
  useEffect(() => {
    if (elemento.id) {
      fetchResenas(elemento.id);
    }
  }, [elemento.id]);

  const onSubmitResena = async () => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    // Aseguramos que el cuidadorId y usuarioId estén actualizados
    if (elemento.id) {
      setField('cuidadorId', elemento.id);
    }
    console.log('uSER ID ' + user.id);
    setField('usuarioId', user.id);
    const success = await handleSubmitResena();
    if (success) {
      // Vuelve a cargar las reseñas para mostrar la recién agregada
      fetchResenas(elemento.id);
    } else {
      // Manejar error de envío aquí, si es necesario
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Botón de volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/white-arrow-invertida.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <LazyYoutubePlayer videoId={elemento.source} />

      {/* Imagen de perfil e icono de corazón */}
      <View style={styles.profileRow}>
        <Image source={{ uri: elemento.urlImagen }} style={styles.profileImage} />
        <View style={styles.heartIconContainer}>
          <Image source={require('../../assets/heart.png')} style={styles.heartIcon} />
        </View>
      </View>

      {/* Datos del cuidador */}
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{elemento.nombre}</Text>
        <Text style={styles.address}>{elemento.direccion}</Text>
        <Text style={styles.address}>{elemento.precioPorHora} €/hora</Text>
        <Text style={styles.address}>Horario: {elemento.horarioAtencion}</Text>
        {diasOrdenados.length > 0 && (
          <Text style={styles.address}>
            Días de atención: {diasOrdenados.map((dia: any) => dia.nombre).join(', ')}
          </Text>
        )}
        <TouchableOpacity
          style={styles.contratarButton}
          onPress={() => {
            if (!user) {
              navigation.navigate('Login');
            } else {
              navigation.navigate('Contratar', { cuidador: elemento });
            }
          }}
        >
          <Text style={styles.contratarText}>Contratar</Text>
        </TouchableOpacity>

      </View>

      {/* Sección Acerca de */}
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>Acerca de</Text>
        <Text style={styles.aboutDescription}>{elemento.descripcion}</Text>
      </View>

      {/* Sección de Reseñas */}
      {resenas && resenas.length > 0 && (
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>Reseñas</Text>
          {resenas.map((resena: any) => (
            <View key={resena.id} style={styles.commentItem}>
              <Image
                source={
                  resena.usuario && resena.usuario.imageUrl
                    ? { uri: resena.usuario.imageUrl }
                    : require('../../assets/user-interface.png')
                }
                style={styles.commentUserImage}
              />
              <View style={styles.commentContent}>
                <Text style={styles.commentUserName}>
                  {resena.usuario ? resena.usuario.nombre : 'Anónimo'}
                </Text>
                <Text style={styles.commentText}>{resena.comentario}</Text>
                <Text style={styles.commentRating}>
                  {'★'.repeat(Math.floor(resena.calificacion))}
                  {'☆'.repeat(5 - Math.floor(resena.calificacion))}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Sección para dejar reseña */}
      <View style={styles.addCommentContainer}>
        <Text style={styles.addCommentTitle}>Deja tu reseña</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Escribe tu reseña..."
          multiline
          value={resenaData.comentario}
          onChangeText={(text) => setField('comentario', text)}
        />
        <View style={styles.starRatingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setField('calificacion', star)}>
              <Text style={styles.star}>
                {star <= resenaData.calificacion ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.submitCommentButton} onPress={onSubmitResena}>
          <Text style={styles.submitCommentButtonText}>Enviar reseña</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetalleScreen;

const styles = StyleSheet.create({
  // Tus estilos existentes...
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  video: {
    width: width,
    height: 250,
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
    zIndex: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -80,
    marginHorizontal: 30,
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ff9900',
    shadowColor: '#ff9900',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 75,
    right: -6,
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff9900',
  },
  heartIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ff9900',
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  contratarButton: {
    marginTop:12,
    backgroundColor: '#ff9900',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'center',
    width: '60%',
    marginBottom: 10,
  },
  contratarText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  aboutContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  aboutTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ff9900',
    marginBottom: 10,
  },
  aboutDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    textAlign: 'justify',
  },
  commentsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  commentsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff9900',
    marginBottom: 10,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
    height: 80,
  },
  commentUserImage: {
    marginTop: 15,
    marginRight: 15,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  commentContent: {
    flex: 1,
  },
  commentUserName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  commentText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
    textAlign: 'justify',
  },
  commentRating: {
    fontSize: 18,
    color: '#ff9900',
  },
  addCommentContainer: {
    paddingHorizontal: 20,
    marginBottom: 0,
  },
  addCommentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff9900',
    marginBottom: 10,
  },
  commentInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  starRatingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 24,
    color: '#ff9900',
    marginRight: 5,
  },
  submitCommentButton: {
    backgroundColor: '#ff9900',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'center',
  },
  submitCommentButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
