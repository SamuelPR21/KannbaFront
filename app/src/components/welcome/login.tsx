import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const imagenlogo = require('../../../../assets/images/welcome/loginimg/catlogo.jpg'); 

export default function LoginScreen({route}: any) {

  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  if(route?.params?.registered) {
    Alert.alert("Exito", "¡Registro exitoso! Por favor, inicie sesión con sus nuevas credenciales.");
    route.params.registered = false;
  }

  const handleLogin = () => {
    // 1. Lógica de Validación (No Vacío)
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error de Validación", "Por favor, complete ambos campos (Usuario y Contraseña).");
      return; 
    }
    
    // 2. Aquí iría la llamada a la API de autenticación real
    console.log('Login attempt with:', username, password);
    
    // 3. Alerta de Éxito (Simulación)
    Alert.alert(
      "Inicio de Sesión Exitoso",
      "¡Bienvenido de vuelta!",
      [
        { 
          text: "OK", 
          onPress: () => {
           navigation.navigate('ModalChange' as never);
            // Aquí iría la redirección post-login: router.replace('/home'); 
          }
        }
      ]
    );
  };
  
  // Función auxiliar para cerrar el teclado al presionar el botón de Login
  const handleLoginPress = () => {
      Keyboard.dismiss();
      handleLogin();
  };


  return (
    // CLAVE: Envolver todo el contenido que maneja el teclado
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-white">
        {/* Usamos un View simple ya que la pantalla de Login suele ser corta */}
        <View className="flex-1 justify-center p-6">
          
          {/* --- LOGO Y TEXTO SUPERPUESTO (NativeWind) --- */}
          <View className="w-36 h-36 self-center mb-10 relative border-4 border-blue-500 rounded-xl overflow-hidden">
              <Image
                  source={imagenlogo}
                  className="w-full h-full" 
                  resizeMode="cover" 
              />
              {/* Texto Superpuesto Anclado al Fondo */}
              <Text 
                className="absolute inset-x-0 bottom-0 text-center text-blue-500 font-bold text-sm bg-white/60 py-1"
              >
                  Kannba
              </Text>
          </View>

          {/* --- FORMULARIO DE LOGIN --- */}
          
          {/* Campo de Usuario */}
          <TextInput
            className="border-2 border-blue-300 rounded-lg p-3 w-full mb-4 text-base leading-tight text-gray-800 focus:border-blue-500" 
            placeholder="Usuario"
            placeholderTextColor="#6B7280"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          
          {/* Campo de Contraseña */}
          <TextInput
            className="border-2 border-blue-300 rounded-lg p-3 w-full mb-6 text-base text-gray-800 focus:border-blue-500" 
            placeholder="Contraseña"
            placeholderTextColor="#6B7280"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Botón de Iniciar Sesión */}
          <TouchableOpacity 
            className="bg-blue-600 rounded-lg p-4 w-full items-center mb-6 shadow-md"
            onPress={handleLoginPress} // <-- Usamos la nueva función que cierra el teclado
          >
            <Text className="text-white font-bold text-base">Iniciar Sesión</Text>
          </TouchableOpacity>

          {/* --- SECCIÓN DE REGISTRO --- */}
          <View className="items-center">
            <Text className="text-gray-600 mb-2">¿No tienes cuenta?</Text>
              <TouchableOpacity 
                className="bg-blue-800 rounded-md p-3 w-1/2 items-center shadow-sm"
                onPress={() => navigation.navigate('Register' as never)}
              >
                <Text className="text-white font-bold">Regístrate</Text>
              </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}