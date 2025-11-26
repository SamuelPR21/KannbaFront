import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createTaskInProject } from "../../../../../../API/task_proyect";
import { listUsersInProject } from "../../../../../../API/user_proyect";


export default function BottomAñadirTarea({ proyectId }: { proyectId: string }) {
  const [modalVisible, setModalVisible] = useState(false);

  const [nombreTarea, setNombreTarea] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [responsable, setResponsable] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const [estado, setEstado] = useState<number | null>(null);
  const estados = [
    { label: "Back Log", id: 1 },
    { label: "To Do", id: 2 },
    { label: "Doing", id: 3 },
    { label: "Done", id: 4 },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await listUsersInProject(proyectId);
      if (data) setUsuarios(data);
    };

    fetchUsers();
  }, []);

  const usuariosFiltrados = usuarios.filter((u) =>
    u.userName.toLowerCase().includes(busqueda.toLowerCase())
  );

  const resetCampos = () => {
    setNombreTarea("");
    setDescripcion("");
    setResponsable(null);
    setBusqueda("");
    setEstado(null);
  };

  const handleCrearTarea = async () => {
    if (!nombreTarea || !descripcion || !responsable || !estado) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    const success = await createTaskInProject(
      proyectId,
      nombreTarea,
      descripcion,
      responsable,
      estado 
    );

    if (success) {
      Alert.alert("Éxito", "Tarea creada");
      setModalVisible(false);
      resetCampos();
    } else {
      Alert.alert("Error", "No se pudo crear la tarea");
    }
  };

  return (
    <View className="ml-2">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-blue-800 px-5 py-3 rounded-lg shadow-md"
      >
        <Text className="text-white font-bold text-center text-lg">
          Añadir Tarea
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          resetCampos();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 justify-center items-center bg-black/60"
        >
          <View className="bg-white w-11/12 p-5 rounded-2xl shadow-lg max-h-[90%]">
            <Text className="text-2xl font-bold text-blue-900 mb-5 text-center">
              Añadir Tarea
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
            >
              {/* Nombre */}
              <View className="flex-row items-center mb-3">
                <Text className="text-blue-800 font-semibold w-1/3">
                  Nombre:
                </Text>
                <TextInput
                  placeholder="Nombre de la tarea"
                  placeholderTextColor="#6b7280"
                  value={nombreTarea}
                  onChangeText={setNombreTarea}
                  className="border border-blue-300 rounded px-3 py-2 bg-blue-50 flex-1"
                />
              </View>

              {/* Descripción */}
              <View className="flex-row items-center mb-3">
                <Text className="text-blue-800 font-semibold w-1/3">
                  Descripción:
                </Text>
                <TextInput
                  placeholder="Breve descripción"
                  placeholderTextColor="#6b7280"
                  value={descripcion}
                  onChangeText={setDescripcion}
                  multiline
                  className="border border-blue-300 rounded px-3 py-2 bg-blue-50 flex-1 min-h-[60px]"
                />
              </View>

              {/* Responsable */}
              <View className="mb-4">
                <Text className="text-blue-800 font-semibold mb-2">Responsable</Text>

                {/* Campo de búsqueda más grande y claro */}
                <View className="flex-row items-center border border-blue-300 rounded-lg bg-white p-2">
                  <TextInput
                    placeholder="Buscar usuario por nombre..."
                    placeholderTextColor="#9CA3AF"
                    value={busqueda}
                    onChangeText={setBusqueda}
                    className="flex-1 px-2 py-3 text-base"
                  />
                </View>

                {/* Lista de resultados: tarjetas grandes y táctiles */}
                {busqueda.length > 0 && (
                  <View className="mt-3 max-h-52">
                    <ScrollView>
                      {usuariosFiltrados.length > 0 ? (
                        usuariosFiltrados.map((user) => (
                          <TouchableOpacity
                            key={user.userProyectId}
                            onPress={() => {
                              setResponsable(user.userProyectId);
                              setBusqueda("");
                            }}
                            className="flex-row items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-3 mb-2 mx-1"
                          >
                            <View className="flex-row items-center">
                              <View className="w-10 h-10 rounded-full bg-blue-200 items-center justify-center mr-3">
                                <Text className="text-blue-700 font-bold">
                                  {String(user.userName || "").slice(0,2).toUpperCase()}
                                </Text>
                              </View>
                              <View>
                                <Text className="text-blue-800 font-semibold">{user.userName}</Text>
                                {user.role && <Text className="text-xs text-gray-500">{user.role}</Text>}
                              </View>
                            </View>

                            <View>
                              <Text className="text-blue-600 font-semibold">Seleccionar</Text>
                            </View>
                          </TouchableOpacity>
                        ))
                      ) : (
                        <View className="p-3">
                          <Text className="text-center text-gray-500 py-2">No se encontraron usuarios</Text>
                        </View>
                      )}
                    </ScrollView>
                  </View>
                )}

                {/* Visual del responsable seleccionado: card resaltada */}
                {responsable && (
                  <View className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-green-200 items-center justify-center mr-3">
                      <Text className="text-green-800 font-bold">
                        {String(usuarios.find((u) => u.userProyectId === responsable)?.userName || "").slice(0,2).toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-green-800 font-semibold">
                        {usuarios.find((u) => u.userProyectId === responsable)?.userName}
                      </Text>
                      <Text className="text-sm text-gray-500">Responsable asignado</Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Estado */}
              <View className="mt-3">
                <Text className="text-blue-800 font-semibold mb-2">
                  Estado:
                </Text>
                <View className="flex-row flex-wrap justify-between">
                  {estados.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => setEstado(item.id)}
                      className={`px-4 py-2 rounded-lg mb-2 ${
                        estado === item.id
                          ? "bg-blue-700"
                          : "bg-blue-100 border border-blue-400"
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          estado === item.id
                            ? "text-white"
                            : "text-blue-800"
                        }`}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Botones */}
              <View className="flex-row justify-between mt-6">
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    resetCampos();
                  }}
                  className="bg-red-600 px-5 py-2 rounded-lg"
                >
                  <Text className="text-white font-bold">Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCrearTarea}
                  className="bg-blue-700 px-5 py-2 rounded-lg"
                >
                  <Text className="text-white font-bold">Guardar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}