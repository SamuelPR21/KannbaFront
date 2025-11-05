import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Footer from "../../navigation/footer";

export default function PerfilUsuario() {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState("Proyecto 4");

  const proyectos = [
    "Proyecto 1",
    "Proyecto 2",
    "Proyecto 3",
    "Proyecto 4",
    "Proyecto 5",
    "Proyecto 6",
    "Proyecto 7",
    "Proyecto 8",
    "Proyecto 9",
  ];

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* Información del usuario */}
      <View className="flex-row items-start justify-between mb-6">
        <View className="flex-col ml-2">
          <Text className="text-lg font-semibold text-gray-800">Juan Tenorio</Text>
          <Text className="text-gray-600 text-base">66 años</Text>
          <Text className="text-gray-600 text-base">Juan_T32</Text>
        </View>
      </View>

      {/* Tareas completadas */}
      <Text className="text-lg font-semibold text-gray-800 mb-2">
        Tareas completadas
      </Text>

      {/* Barra de progreso hecha con NativeWind */}
      <View className="w-full h-2 bg-gray-300 rounded-full mb-2">
        <View className="h-2 bg-blue-600 rounded-full w-[32%]" />
      </View>

      <Text className="text-center text-blue-600 mb-6">32%</Text>

      {/* Lista de proyectos */}
      <View className="border border-gray-400 rounded-lg">
        {proyectos.map((proyecto, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setProyectoSeleccionado(proyecto)}
            className={`p-3 ${
              proyectoSeleccionado === proyecto
                ? "bg-blue-500"
                : index % 2 === 0
                ? "bg-gray-100"
                : "bg-white"
            }`}
          >
            <Text
              className={`text-base ${
                proyectoSeleccionado === proyecto
                  ? "text-white font-semibold"
                  : "text-gray-800"
              }`}
            >
              {proyecto}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <Footer />
    </ScrollView>
  );
}
