import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

interface CreateProjectModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (projectName: string, category: string) => void;
}

export default function CreateProjectModal({
  visible,
  onClose,
  onCreate,
}: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Categoria 1");

  const handleCreate = () => {
    if (projectName.trim()) {
      onCreate(projectName, selectedCategory);
      setProjectName("");
      setSelectedCategory("Categoria 1");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center items-center bg-black/50"
      >
        <View className="bg-white rounded-2xl p-6 w-4/5 shadow-lg">
          <Text className="text-xl font-bold mb-4">Crear Proyecto</Text>
          
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4"
            placeholder="Nombre del proyecto"
            value={projectName}
            onChangeText={setProjectName}
            autoFocus
          />

          <Text className="text-sm font-semibold mb-2">Categoría</Text>
          <View className="border border-gray-300 rounded-lg mb-4 h-14 justify-center">
            <Picker
              selectedValue={selectedCategory}
              onValueChange={setSelectedCategory}
              itemStyle={{ color: "black", fontSize: 16, height: 56 }}
              style={{ height: 56 }}
            >
              <Picker.Item label="Categoria 1" value="Categoria 1" />
              <Picker.Item label="Categoria 2" value="Categoria 2" />
              <Picker.Item label="Categoria 3" value="Categoria 3" />
            </Picker>
          </View>
          
          <TouchableOpacity
            className="bg-blue-500 rounded-lg p-3 mb-2"
            onPress={handleCreate}
          >
            <Text className="text-white font-bold text-center">Crear</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-gray-300 rounded-lg p-3"
            onPress={onClose}
          >
            <Text className="text-gray-700 font-bold text-center">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}