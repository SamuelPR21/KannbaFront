import { Text, TouchableOpacity, View } from "react-native";

interface Tarea {
  nombre: string;
  categoria: string;
}

interface Props {
  tareas: Tarea[];
}

export default function TablaSinProyecto({ tareas }: Props) {
  return (
    <View className="mb-10">
      <Text className="font-semibold text-lg mt-2 mb-2 text-blue-900">Sin Proyecto</Text>

      <View className="border border-blue-600 rounded-lg">
        <View className="flex-row justify-between px-3 py-2 border-b border-blue-600 bg-blue-200">
          <Text className="font-semibold w-1/2 text-blue-800">Nombre</Text>
          <Text className="font-semibold w-1/2 text-blue-800">Categoría</Text>
        </View>

        {tareas.length === 0 ? (
          <Text className="text-center py-4 text-blue-500">Sin tareas</Text>
        ) : (
          tareas.map((t, i) => (
            <View
              key={i}
              className={`flex-row justify-between px-3 py-2 ${
                i % 2 === 0 ? "bg-blue-100" : "bg-blue-50"
              }`}
            >
              <TouchableOpacity className="w-1/2">
                <Text className="text-blue-700 underline">{t.nombre}</Text>
              </TouchableOpacity>
              <Text className="w-1/2 text-blue-700">{t.categoria}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}
