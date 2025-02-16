// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListadoScreen from './src/screens/listado.screen';
import DetalleScreen from './src/screens/detalle.sreen';
import Header from './src/componentes/header'; // Importa tu header custom
import { ElementoDTO } from './src/dto/elemento.dto';

export type RootStackParamList = {
  Listado: undefined;
  Detalle: { elemento: ElementoDTO };
};

const Stack = createStackNavigator<RootStackParamList>();
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined} // Se añade para cumplir con el tipo requerido
        initialRouteName="Listado"
        screenOptions={{
          // Se usa tu header custom en todas las pantallas
          header: () => (
            <Header
              username="Usuario"
              onPress={() => console.log("Header pressed")}
            />
          ),
        }}
      >
        <Stack.Screen 
          name="Listado" 
          component={ListadoScreen} 
          options={{ title: 'Listado de Elementos' }}
        />
        <Stack.Screen 
          name="Detalle" 
          component={DetalleScreen} 
          options={{ title: 'Ficha Descriptiva' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
