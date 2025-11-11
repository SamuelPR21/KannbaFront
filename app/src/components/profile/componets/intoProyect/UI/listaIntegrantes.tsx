import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type Integrante = {
  id: string;
  nombre: string;
};

type Props = {
  agregarIntegrante: (usuario: Integrante) => void;
};

export default function ListaIntegrantes({ agregarIntegrante }: Props) {
  const [integrantes, setIntegrantes] = useState<Integrante[]>([
    { id: "1", nombre: "Juan Perez" },
    { id: "2", nombre: "Maria Gomez" },
    { id: "3", nombre: "Carlos Sanchez" },
    {id: "4", nombre: "Laura Torres"},
    {id: "5", nombre: "Pedro Alvarez"},
    {id: "6", nombre: "Ana Ramirez"},
    {id: "7", nombre: "Luisa Fernandez"},
    {id: "8", nombre: "Miguel Rodriguez"},
    {id: "9", nombre: "Sofia Martinez"},

  ]);
  const [showIntegrantes, setShowIntegrantes] = useState(false);

  const eliminarIntegrante = (id: string) => {
    setIntegrantes((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAgregarIntegrante = (usuario: Integrante) => {
    setIntegrantes((prev) => [...prev, usuario]);
    if (!showIntegrantes) setShowIntegrantes(true);
  };

  return (
    <View className="mb-6">
      <TouchableOpacity
        onPress={() => setShowIntegrantes((prev) => !prev)}
        className="mb-2 flex-row justify-between items-center"
      >
        <Text className="text-blue-700 ml-1 font-semibold text-lg">
          Integrantes del proyecto
        </Text>
        <Text className="text-blue-500 text-lg">{showIntegrantes ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {showIntegrantes && (
        <View
          style={{
            maxHeight: 250, 
            borderWidth: 1,
            borderColor: "#bfdbfe",
            backgroundColor: "#f0f9ff",
            borderRadius: 12,
            padding: 8,
          }}
        >
          <FlatList
            data={integrantes}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded-lg shadow-sm">
                <Text className="text-blue-800 font-medium">{item.nombre}</Text>
                <TouchableOpacity
                  onPress={() => eliminarIntegrante(item.id)}
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  <Text className="text-white font-bold">-</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
