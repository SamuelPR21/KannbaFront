import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getCategories } from "../../../../API/categories";
import { createProject } from "../../../../API/proyect";

interface CreateProjectModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (projectName: string, category: string) => void;
}

export default function CreateProjectModal({ visible, onClose, onCreate,}: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(-1);
  const [categories, setCategories] = useState<any[]>([]);

  const handleCreate = async () => {
    if (
      projectName.trim() &&
      selectedCategory !== null &&
      selectedCategory !== -1
    ) {
      try {
        const response = await createProject({
          name: projectName,
          categoryId: selectedCategory,
        });

        if (response) {
          onCreate(projectName, String(selectedCategory));
          setProjectName("");
          setSelectedCategory(-1);
          onClose();
          alert("Proyecto creado exitosamente.");
        } else {
          alert("Error al crear el proyecto.");
        }
      } catch (error) {
        console.error("Error creating project:", error);
        alert("Error al crear el proyecto.");
      }
    } else {
      alert("Por favor seleccione una categoría válida.");
    }
  };
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data ?? []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

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
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <Picker.Item label="Seleccione una categoría..." value={-1} />

              {categories.map((cat) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
              ))}
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