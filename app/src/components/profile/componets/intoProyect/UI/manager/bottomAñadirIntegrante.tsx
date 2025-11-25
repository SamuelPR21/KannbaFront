import React, { useEffect, useState } from "react";
import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getUserIsNotProject } from "../../../../../../API/user_proyect";

type Usuario = {
  id: string;
  username: string;
  nameComlpete: string;
};

type Props = {
  projectId: number;
  agregarIntegrante: (usuario: Usuario) => void;
};

export default function BottomAñadirIntegrante({ projectId, agregarIntegrante }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [role, setRole] = useState<"MANAGER" | "COLABORADOR" | null>(null);
  const [usuariosAPI, setUsuariosAPI] = useState<Usuario[]>([]);


    useEffect(() => {
    if (!modalVisible) return;

    const fetchUsuarios = async () => {
      try {
        const data = await getUserIsNotProject(projectId);
        if (Array.isArray(data)) {
          setUsuariosAPI(data);
        }
      } catch (error) {
        console.log("❌ Error cargando usuarios:", error);
      }
    };

    fetchUsuarios();
  }, [modalVisible]);

    const usuariosFiltrados = usuariosAPI.filter((u) =>
    u.nameComlpete.toLowerCase().includes(search.toLowerCase())
  );

  const confirmarAgregar = () => {
    if (!usuarioSeleccionado || !role) return;

    Alert.alert(
      "Confirmación",
      `¿Deseas agregar a "${usuarioSeleccionado.nameComlpete}" como ${role}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: () => {
            agregarIntegrante(usuarioSeleccionado);

            setModalVisible(false);
            setSearch("");
            setUsuarioSeleccionado(null);
            setRole(null);

            alert(`${usuarioSeleccionado.nameComlpete} ahora es integrante del proyecto.`);
          },
        },
      ]
    );
  };



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
            <Text className="text-xl font-bold text-blue-800 mb-3">Añadir Integrante</Text>

            {/* Buscar */}
            <TextInput
              placeholder="Buscar nombre de usuario"
              value={search}
              onChangeText={setSearch}
              className="border border-blue-300 rounded px-3 py-2 mb-3 bg-blue-50"
            />

            {/* Lista */}
            {!usuarioSeleccionado && (
              <FlatList
                data={usuariosFiltrados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="flex-row justify-between items-center py-2 border-b border-blue-100">
                    <Text className="text-blue-800">{item.nameComlpete}</Text>

                    <TouchableOpacity
                      onPress={() => setUsuarioSeleccionado(item)}
                      className="bg-blue-700 px-3 py-1 rounded"
                    >
                      <Text className="text-white font-bold">Añadir</Text>
                    </TouchableOpacity>
                  </View>
                )}
                style={{ maxHeight: 200 }}
              />
            )}

            {/* Roles */}
            {usuarioSeleccionado && (
              <View className="mt-4">
                <Text className="text-lg font-semibold text-blue-800 mb-2">
                  Selecciona un rol para {usuarioSeleccionado.nameComlpete}:
                </Text>

                <View className="flex-row justify-around mb-4">
                  <TouchableOpacity
                    className={`px-4 py-2 rounded ${
                      role === "MANAGER" ? "bg-blue-700" : "bg-blue-300"
                    }`}
                    onPress={() => setRole("MANAGER")}
                  >
                    <Text className="text-white font-bold">MANAGER</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`px-4 py-2 rounded ${
                      role === "COLABORADOR" ? "bg-blue-700" : "bg-blue-300"
                    }`}
                    onPress={() => setRole("COLABORADOR")}
                  >
                    <Text className="text-white font-bold">COLABORADOR</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  disabled={!role}
                  onPress={confirmarAgregar}
                  className={`px-4 py-2 rounded ${
                    role ? "bg-green-600" : "bg-gray-400"
                  }`}
                >
                  <Text className="text-white font-bold text-center">Confirmar</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Cerrar */}
            <TouchableOpacity
              onPress={() => {
                setUsuarioSeleccionado(null);
                setRole(null);
                setModalVisible(false);
              }}
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