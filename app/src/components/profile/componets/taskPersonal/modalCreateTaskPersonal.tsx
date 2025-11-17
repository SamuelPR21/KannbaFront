import React from "react";
import { Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ModalCreateTaskPersonal({modalVisible, setModalVisible}: {modalVisible: boolean, setModalVisible: (value: boolean) => void}) {
    const [nombreTarea, setNombreTarea] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [estado, setEstado] = React.useState<string | null>(null);

  function resetCampos() {
    setNombreTarea("");
    setDescripcion("");
    setEstado(null);
  }

  const estados = ["Back Log", "To Do", "Doing", "Done"];



    const handleCrearTarea = () => {
        if (!nombreTarea.trim() || !descripcion.trim() || !estado) {
          Alert.alert("Error", "Por favor completa todos los campos.");
          return;
        }
    
        console.log({
          nombreTarea,
          descripcion,
          estado,
        });
    
        Alert.alert("Tarea creada", `La tarea "${nombreTarea}" fue creada exitosamente.`);
        setModalVisible(false);
        resetCampos();
      };

  return (
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

  );
}