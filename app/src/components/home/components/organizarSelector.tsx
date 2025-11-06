import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  organizarPor: string;
  opciones: string[];
  onSelect: (value: string) => void;
}

export default function OrganizarSelector({ organizarPor, opciones, onSelect }: Props) {
  const [mostrar, setMostrar] = useState(false);

  return (
    <View>
      <Text className="font-semibold mb-1 text-blue-800">Organizar por:</Text>
      <TouchableOpacity
        onPress={() => setMostrar(!mostrar)}
        className="border border-blue-500 rounded p-2 mb-2 flex-row justify-between bg-blue-100"
      >
        <Text className="text-blue-700">{organizarPor}</Text>
        <Text className="text-blue-700">▼</Text>
      </TouchableOpacity>

      {mostrar && (
        <View className="border border-blue-300 rounded mb-3 bg-blue-100">
          {opciones.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                onSelect(item);
                setMostrar(false);
              }}
              className={`p-2 ${organizarPor === item ? "bg-blue-300" : "bg-blue-50"}`}
            >
              <Text className="text-blue-800">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
