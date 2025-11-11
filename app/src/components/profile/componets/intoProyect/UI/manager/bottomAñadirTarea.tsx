import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function BottomAñadirTarea() {
  const [modalVisible, setModalVisible] = useState(false);

  const [nombreTarea, setNombreTarea] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [responsable, setResponsable] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [usuarios] = useState([
    "Usuario 1",
    "Usuario 2",
    "Usuario 3",
    "Usuario 4",
    "Usuario 5",
    "Usuario 6",
    "Usuario 7",
    "Usuario 8",
    "Usuario 9",
  ]);

  // Filtrado de usuarios
  const usuariosFiltrados = usuarios.filter((user) =>
    user.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Estado de tarea
  const [estado, setEstado] = useState<string | null>(null);
  const estados = ["Back Log", "To Do", "Doing", "Done"];

  // Reiniciar campos
  const resetCampos = () => {
    setNombreTarea("");
    setDescripcion("");
    setResponsable(null);
    setBusqueda("");
    setEstado(null);
  };

  // Validar y crear tarea
  const handleCrearTarea = () => {
    if (!nombreTarea.trim() || !descripcion.trim() || !responsable || !estado) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    console.log({
      nombreTarea,
      descripcion,
      responsable,
      estado,
    });

    Alert.alert("Tarea creada", `La tarea "${nombreTarea}" fue creada exitosamente.`);
    setModalVisible(false);
    resetCampos();
  };

  return (
    <View className="ml-2">
      {/* Botón para abrir modal */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-blue-800 px-5 py-3 rounded-lg shadow-md"
      >
        <Text className="text-white font-bold text-center text-lg">Añadir Tarea</Text>
      </TouchableOpacity>

      {/* Modal */}
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
              {/* Campo Nombre */}
              <View className="flex-row items-center mb-3">
                <Text className="text-blue-800 font-semibold w-1/3">Nombre:</Text>
                <TextInput
                  placeholder="Nombre de la tarea"
                  placeholderTextColor="#6b7280"
                  value={nombreTarea}
                  onChangeText={setNombreTarea}
                  className="border border-blue-300 rounded px-3 py-2 bg-blue-50 flex-1"
                />
              </View>

              {/* Campo Descripción */}
              <View className="flex-row items-center mb-3">
                <Text className="text-blue-800 font-semibold w-1/3">Descripción:</Text>
                <TextInput
                  placeholder="Breve descripción"
                  placeholderTextColor="#6b7280"
                  value={descripcion}
                  onChangeText={setDescripcion}
                  multiline
                  className="border border-blue-300 rounded px-3 py-2 bg-blue-50 flex-1 min-h-[60px]"
                />
              </View>

              {/* Buscar Responsable */}
              <View className="mb-3">
                <Text className="text-blue-800 font-semibold mb-2">Responsable:</Text>
                <TextInput
                  placeholder="Buscar nombre de usuario"
                  placeholderTextColor="#6b7280"
                  value={busqueda}
                  onChangeText={setBusqueda}
                  className="border border-blue-300 rounded px-3 py-2 bg-blue-50"
                />

                {/* Lista filtrada */}
                {busqueda.length > 0 && (
                  <View className="border border-blue-200 bg-blue-50 rounded mt-2 max-h-40">
                    <ScrollView>
                      {usuariosFiltrados.length > 0 ? (
                        usuariosFiltrados.map((user, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setResponsable(user);
                              setBusqueda("");
                            }}
                            className="flex-row justify-between items-center px-3 py-2 border-b border-blue-100"
                          >
                            <Text className="text-blue-800">{user}</Text>
                            <Text className="text-blue-600 font-semibold">Añadir</Text>
                          </TouchableOpacity>
                        ))
                      ) : (
                        <Text className="text-center text-gray-500 py-2">
                          No se encontraron usuarios
                        </Text>
                      )}
                    </ScrollView>
                  </View>
                )}

                {/* Usuario seleccionado */}
                {responsable && (
                  <Text className="mt-2 text-green-700 font-semibold">
                    Responsable: {responsable}
                  </Text>
                )}
              </View>

              {/* Estado con botones */}
              <View className="mt-3">
                <Text className="text-blue-800 font-semibold mb-2">Estado:</Text>
                <View className="flex-row flex-wrap justify-between">
                  {estados.map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => setEstado(item)}
                      className={`px-4 py-2 rounded-lg mb-2 ${
                        estado === item
                          ? "bg-blue-700"
                          : "bg-blue-100 border border-blue-400"
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          estado === item ? "text-white" : "text-blue-800"
                        }`}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Botones de acción */}
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
