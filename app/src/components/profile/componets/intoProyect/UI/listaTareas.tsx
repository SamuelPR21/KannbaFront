import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { getStates } from "../../../../../API/state";
import { deleteTaskInProject, listTaskProjectsByState, updateProjectTask } from "../../../../../API/task_proyect";
import TareaItem from "./tareaItem";

type Tarea = {
  id: string;
  nombre: string;
  descripcion: string;
  responsable: string;
  estado: "Back Log" | "To Do" | "Doing" | "Done";
  userProyectId?: number;
  hasChanges?: boolean;
};

interface Props {
  rol: "manager" | "colaborador";
  filtroCategoria: "Back Log" | "To Do" | "Doing" | "Done";
  proyectId: number | string;
}

export default function ListaTareas({ rol, filtroCategoria, proyectId }: Props) {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [states, setStates] = useState<any[]>([]);

  // --- 1. Cargar estados reales del backend ---
  useEffect(() => {
  const fetchStates = async () => {
    const response = await getStates();
    console.log("Estados del backend:", response);
    setStates(response || []);
  };
  fetchStates();
  }, []);

  // --- Map UI -> backend string ---
  const prettyToBackend: Record<string, string> = {
    "Back Log": "BACKLOG",
    "To Do": "TO_DO",
    "Doing": "DOING",
    "Done": "DONE",
  };

  // --- Map UI -> backend ID ---
  const getStateIdFromPretty = (pretty: string) => {
    const backendName = prettyToBackend[pretty];
    const match = states.find((s) => s.name === backendName);
    return match?.id ?? null;
  };

  // --- 2. Cargar tareas filtradas ---
  useEffect(() => {
    const fetchTareas = async () => {
      try {
        // el backend quiere el nombre, NO el ID
        const backendName = prettyToBackend[filtroCategoria];

        const data = await listTaskProjectsByState(
          Number(proyectId),
          backendName
        );

        if (data) {
          setTareas(
            data.map((t: any) => ({
              id: String(t.taskId),
              nombre: t.name,
              descripcion: t.description ?? "Sin descripción",
              responsable: t.responsible?.username ?? "Sin responsable",
              estado: filtroCategoria,
            }))
          );
        }
      } catch (error) {
        console.error("Error cargando tareas:", error);
        Alert.alert("Error", "No se pudieron cargar las tareas.");
      }
    };

    fetchTareas();
  }, [filtroCategoria, proyectId]);


  // --- 3. Marcar cambios ---
  const handleUpdate = (tareaActualizada: Tarea) => {
    setTareas((prev) =>
      prev.map((t) =>
        t.id === tareaActualizada.id
          ? { ...t, ...tareaActualizada, hasChanges: true }
          : t
      )
    );
  };

  // --- 4. Eliminar ---
  const handleDelete = (id: string) => {
    Alert.alert("Eliminar tarea", "¿Deseas eliminar esta tarea?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: async () => {
          const exito = await deleteTaskInProject(proyectId, id);
          if (exito) {
            setTareas((prev) => prev.filter((t) => t.id !== id));
          }
        },
      },
    ]);
  };

  // --- 5. Guardar cambios en backend ---
 const handleGuardarCambios = async () => {
  const tareasModificadas = tareas.filter((t) => t.hasChanges);

  if (tareasModificadas.length === 0) {
    Alert.alert("Sin cambios", "No hay tareas modificadas.");
    return;
  }

  try {
    for (const tarea of tareasModificadas) {
      const stateId = getStateIdFromPretty(tarea.estado);

      if (!stateId) {
        throw new Error(`Estado inválido para la tarea ${tarea.nombre}`);
      }

      const success = await updateProjectTask(
        Number(proyectId),
        Number(tarea.id),
        {
          name: tarea.nombre,
          description: tarea.descripcion,
          stateId: stateId,
          userProyectId: tarea.userProyectId,  

        }
      );

      if (!success) {
        throw new Error(`No se pudo actualizar la tarea ${tarea.nombre}`);
      }
    }

    Alert.alert("Éxito", "Los cambios se guardaron correctamente.");

    setTareas((prev) => prev.map((t) => ({ ...t, hasChanges: false })));
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Ocurrió un error al guardar los cambios.");
  }
};
  const hayCambios = tareas.some((t) => t.hasChanges);

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
            proyectId={proyectId}
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
