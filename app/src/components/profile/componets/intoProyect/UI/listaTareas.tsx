import React, { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import TareaItem from "./tareaItem";

type Tarea = {
  id: string;
  nombre: string;
  descripcion: string;
  responsable: string;
  estado: "Back Log" | "To Do" | "Doing" | "Done";
  hasChanges?: boolean;
};

interface Props {
  rol: "manager" | "colaborador";
  filtroCategoria: "Back Log" | "To Do" | "Doing" | "Done";
}

export default function ListaTareas({ rol, filtroCategoria }: Props) {
  const [tareas, setTareas] = useState<Tarea[]>([
    {
      id: "1",
      nombre: "Diseñar interfaz",
      descripcion: "Crear pantalla principal con colores definidos",
      responsable: "Samuel",
      estado: "To Do",
    },
    {
      id: "2",
      nombre: "Configurar backend",
      descripcion: "Inicializar proyecto con Spring y Kotlin",
      responsable: "Laura",
      estado: "Back Log",
    },
    {
      id: "3",
      nombre: "Probar endpoints",
      descripcion: "Testear API de usuarios",
      responsable: "Pedro",
      estado: "Doing",
    },
    {
      id: "4",
      nombre: "Deploy final",
      descripcion: "Publicar versión estable en el servidor",
      responsable: "Ana",
      estado: "Done",
    },
  ]);

  const handleUpdate = (tareaActualizada: Tarea) => {
    setTareas((prev) =>
      prev.map((t) =>
        t.id === tareaActualizada.id
          ? { ...t, ...tareaActualizada, hasChanges: true }
          : t
      )
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert("Eliminar tarea", "¿Deseas eliminar esta tarea?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: () =>
          setTareas((prev) => prev.filter((t) => t.id !== id)),
      },
    ]);
  };

  const handleGuardarCambios = () => {
    const tareasModificadas = tareas.filter((t) => t.hasChanges);
    if (tareasModificadas.length === 0) {
      Alert.alert("Sin cambios", "No hay tareas modificadas.");
      return;
    }

    console.log("Tareas modificadas:", tareasModificadas);
    Alert.alert("Éxito", "Los cambios se guardaron correctamente.");

    setTareas((prev) => prev.map((t) => ({ ...t, hasChanges: false })));
  };

  const hayCambios = tareas.some((t) => t.hasChanges);

  // 🔹 Filtrar por categoría seleccionada
  const tareasFiltradas = tareas.filter((t) => t.estado === filtroCategoria);

  return (
    <View className="flex-1 bg-blue-50 p-4">
      <Text className="text-2xl font-bold text-blue-900 mb-4 text-center">
        {`Tareas: ${filtroCategoria}`}
      </Text>

      <FlatList
        data={tareasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TareaItem
            tarea={item}
            rol={rol}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-center text-blue-500 mt-6">
            No hay tareas en esta categoría.
          </Text>
        }
      />

      {rol === "manager" && hayCambios && (
        <TouchableOpacity
          onPress={handleGuardarCambios}
          className="bg-blue-800 mt-4 py-3 rounded-lg shadow-md"
        >
          <Text className="text-white text-center font-bold text-lg">
            Guardar Cambios
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
