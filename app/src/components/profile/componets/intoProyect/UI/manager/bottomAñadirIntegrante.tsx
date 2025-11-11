import React, { useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

type Usuario = {
  id: string;
  nombre: string;
};

type Props = {
  agregarIntegrante: (usuario: Usuario) => void;
  usuarios: Usuario[];
};

export default function BottomAñadirIntegrante({ agregarIntegrante, usuarios }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  // Filtrado de usuarios basado en búsqueda
  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="ml-2">
      {/* Botón flotante */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-blue-700 px-4 py-2 rounded"
      >
        <Text className="text-white font-bold">+</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-11/12 p-4 rounded-lg shadow-lg">
            <Text className="text-xl font-bold text-blue-800 mb-3">
              Añadir Integrante
            </Text>

            <TextInput
              placeholder="Buscar nombre de usuario"
              value={search}
              onChangeText={setSearch}
              className="border border-blue-300 rounded px-3 py-2 mb-3 bg-blue-50"
            />

            <FlatList
              data={usuariosFiltrados}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="flex-row justify-between items-center py-2 border-b border-blue-100">
                  <Text className="text-blue-800">{item.nombre}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      agregarIntegrante(item);
                      setModalVisible(false);
                      setSearch("");
                    }}
                    className="bg-blue-700 px-3 py-1 rounded"
                  >
                    <Text className="text-white font-bold">Añadir</Text>
                  </TouchableOpacity>
                </View>
              )}
              style={{ maxHeight: 200 }}
            />

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-4 bg-red-500 px-4 py-2 rounded"
            >
              <Text className="text-white font-bold text-center">Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
