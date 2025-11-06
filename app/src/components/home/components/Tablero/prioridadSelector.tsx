import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  selectedPriority: string;
  onSelect: (priority: string) => void;
}

export default function PrioridadSelector({ selectedPriority, onSelect }: Props) {
  const [mostrar, setMostrar] = useState(false);
  const prioridades = ["Alta", "Media", "Baja"];

  return (
    <View className="mt-4">
      <Text className="font-semibold mb-1 text-blue-800">Prioridad</Text>
      <TouchableOpacity
        onPress={() => setMostrar(!mostrar)}
        className="border border-blue-500 rounded p-2 mb-2 flex-row justify-between bg-blue-100"
      >
        <Text className="text-blue-700">{selectedPriority}</Text>
        <Text className="text-blue-700">▼</Text>
      </TouchableOpacity>

      {mostrar && (
        <View className="border border-blue-300 rounded mb-4 bg-blue-100">
          {prioridades.map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => {
                onSelect(p);
                setMostrar(false);
              }}
              className={`p-2 ${selectedPriority === p ? "bg-blue-300" : "bg-blue-50"}`}
            >
              <Text className="text-blue-800">{p}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
