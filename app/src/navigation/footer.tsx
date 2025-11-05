
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Pantallas simples de ejemplo
function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de Perfil</Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla Home</Text>
    </View>
  );
}

function LogoutScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cerrar Sesión</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false, // Oculta los textos debajo de los íconos
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 70,
            borderTopWidth: 0,
            elevation: 10,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Logout') {
              iconName = focused ? 'log-out' : 'log-out-outline';
            }

            return (
              <Ionicons
                name={iconName}
                size={30}
                color={focused ? 'tomato' : 'gray'}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Logout" component={LogoutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}