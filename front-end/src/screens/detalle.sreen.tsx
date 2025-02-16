// src/view/DetalleScreen.tsx

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type DetalleScreenRouteProp = RouteProp<RootStackParamList, 'Detalle'>;

type Props = {
  route: DetalleScreenRouteProp;
};

const DetalleScreen: React.FC<Props> = ({ route }) => {
  const { elemento } = route.params;
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>{elemento.titulo}</Text>
      <Text style={styles.descripcion}>{elemento.descripcion}</Text>
    </View>
  );
};

export default DetalleScreen;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 16,
    marginTop: 10,
  },
});
