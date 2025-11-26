import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../../navigation/types";

interface Tarea {
  id?: number;
  nombre: string;
  proyecto: string;
  estado?: string;
}

interface Props {
  tareas: Tarea[];
}

export default function TablaTareas({ tareas }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const goToModalInfo = () => navigation.navigate("ModalInfo");

  return (
    <View className="border border-blue-600 rounded-lg mt-2">
      {/* Encabezado */}
      <View className="flex-row justify-between px-3 py-2 border-b border-blue-600 bg-blue-200">
        <Text className="font-semibold w-1/2 text-blue-800">Nombre</Text>
        <Text className="font-semibold w-1/2 text-blue-800">Proyecto</Text>
      </View>

      {/* Filas */}
      {tareas.length === 0 ? (
        <Text className="text-center py-4 text-blue-500">No hay tareas</Text>
      ) : (
        tareas.map((t, i) => (
          <View
            key={t.id ?? i}
            className={`flex-row justify-between px-3 py-2 ${
              i % 2 === 0 ? "bg-blue-100" : "bg-blue-50"
            }`}
          >
            <TouchableOpacity onPress={goToModalInfo} className="w-1/2">
              <Text className="text-blue-700 underline">{t.nombre}</Text>
            </TouchableOpacity>
            <Text className="w-1/2 text-blue-700">{t.proyecto}</Text>
          </View>
        ))
      )}
    </View>
  );
}
