// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListadoScreen from './src/screens/listado.screen';
import DetalleScreen from './src/screens/detalle.sreen';
import LoginScreen from './src/screens/login.screen';
import SplashScreen from './src/screens/SplashScreen';
import RegistroScreen from './src/screens/RegistroScreen'; // Importa la pantalla de registro
import { CuidadorModel } from '../front-end/src/model/CuidadorModel';
import { AuthProvider } from './src/auth/AuthContext';

export type RootStackParamList = {
  Splash: undefined;
  Listado: undefined;
  Detalle: { elemento: CuidadorModel };
  Login: undefined;
  Registro: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
        id={undefined}
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }} // Quita el header globalmente
        >
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
          />
          <Stack.Screen 
            name="Listado" 
            component={ListadoScreen} 
          />
          <Stack.Screen 
            name="Detalle" 
            component={DetalleScreen} 
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
          />
          <Stack.Screen 
            name="Registro" 
            component={RegistroScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
