import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, Image, Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import useAuth from "../../hook/useAuth";
import { RootStackParamList } from "../../navigation/types";

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Login">>();
  const imagenlogo = require("../../../../assets/images/welcome/loginimg/catlogo.jpg");
  const {login} = useAuth();
  



  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });



  useEffect(() => {
    if (route.params?.registered) {
      Alert.alert(
        "Éxito",
        "¡Registro exitoso! Por favor, inicia sesión con tus nuevas credenciales."
      );
      navigation.setParams({ registered: undefined });
    }
  }, [route.params]);

  const goToRegister = () => navigation.navigate("Register");

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      return Alert.alert("Error de Validación", 
        "Por favor, complete ambos campos (Email y Contraseña)."
      );
    }

    if(!formData.email.includes("@")){
      return Alert.alert("Error de Validación", 
      "Por favor, ingrese un correo electrónico válido."
    );
    }

    try{
      await login({
        email: formData.email,
        password: formData.password
      });        
    }catch(error){
      console.error("Error en el manejo de login:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center p-6">
          <View className="w-36 h-36 self-center mb-10 relative border-4 border-blue-500 rounded-xl overflow-hidden">
            <Image source={imagenlogo} className="w-full h-full" resizeMode="cover" />
            <Text className="absolute inset-x-0 bottom-0 text-center text-blue-500 font-bold text-sm bg-white/60 py-1">
              MIAU
            </Text>
          </View>

          <TextInput
            className="border-2 border-blue-300 rounded-lg p-3 w-full mb-4 text-base leading-tight text-gray-800 focus:border-blue-500"
            placeholder="Correo Electrónico"
            placeholderTextColor="#6B7280"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            autoCapitalize="none"
          />

          <TextInput
            className="border-2 border-blue-300 rounded-lg p-3 w-full mb-6 text-base text-gray-800 focus:border-blue-500"
            placeholder="Contraseña"
            placeholderTextColor="#6B7280"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
          />

          <TouchableOpacity
            className="bg-blue-600 rounded-lg p-4 w-full items-center mb-6 shadow-md"
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-base">Iniciar Sesión</Text>
          </TouchableOpacity>

          <View className="items-center">
            <Text className="text-gray-600 mb-2">¿No tienes cuenta?</Text>
            <TouchableOpacity
              className="bg-blue-800 rounded-md p-3 w-1/2 items-center shadow-sm"
              onPress={goToRegister}
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold">Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}