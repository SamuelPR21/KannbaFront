import Feather from "@expo/vector-icons/Feather";
import React, { useEffect, useState } from "react";
import { Alert, LayoutAnimation, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

const ESTADOS = ["Back Log", "To Do", "Doing", "Done"];

export default function ModalTaskPersonal({
  visible,
  tarea,
  onClose,
  onUpdate,
  onDelete,
}: {
  visible: boolean;
  tarea: any;
  onClose: () => void;
  onUpdate: (t: any) => void;
  onDelete: (id: string) => void;
}) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");

  const [edited, setEdited] = useState(false);

  const DEFAULT_TASK = {
    id: tarea?.id ?? "temp-id",
    nombre: tarea?.nombre ?? "Tarea sin título",
    descripcion: tarea?.descripcion ?? "Sin descripción",
    estado: tarea?.estado ?? "Back Log",
  };

  useEffect(() => {
    if (tarea) {
      setNombre(DEFAULT_TASK.nombre);
      setDescripcion(DEFAULT_TASK.descripcion);
      setEstado(DEFAULT_TASK.estado);
      setEdited(false);
    }
  }, [tarea]);

  const detectChanges =
    nombre !== DEFAULT_TASK.nombre ||
    descripcion !== DEFAULT_TASK.descripcion ||
    estado !== DEFAULT_TASK.estado;

  const handleSave = () => {
    const datosActualizados = {
      ...tarea,
      nombre,
      descripcion,
      estado,
    };

    onUpdate(datosActualizados);

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setEdited(true);

    setTimeout(() => {
      setEdited(false);
      onClose(); 
    }, 1200);
  };

  // CERRAR MODAL
  const handleClose = () => {
    if (detectChanges) {
      return Alert.alert(
        "Cambios sin guardar",
        "¿Deseas descartarlos?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Descartar",
            style: "destructive",
            onPress: onClose,
          },
        ]
      );
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/40 justify-center p-5">

        <View className="bg-white rounded-3xl p-6 shadow-lg">

          {/* TITULO */}
          <Text className="text-2xl font-bold text-blue-900 text-center mb-4">
            {DEFAULT_TASK.nombre}
          </Text>

          {edited && (
            <Text className="text-green-600 text-center mb-2 font-semibold">
              ✓ Tarea correctamente actualizada
            </Text>
          )}

          <Text className="text-sm text-gray-600">Título</Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            className="border border-blue-300 rounded-xl p-3 bg-blue-50 text-blue-900 mb-3"
          />

          <Text className="text-sm text-gray-600 mb-2">Estado</Text>

          <View className="flex-row justify-between mb-4">
            {ESTADOS.map((e) => (
              <TouchableOpacity
                key={e}
                onPress={() => setEstado(e)}
                className={`flex-1 mx-1 py-2 rounded-xl ${
                  estado === e ? "bg-blue-700" : "bg-blue-200"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    estado === e ? "text-white" : "text-blue-900"
                  }`}
                >
                  {e}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-sm text-gray-600">Descripción</Text>
          <TextInput
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            className="border border-blue-300 bg-blue-50 rounded-xl p-3 text-blue-900 h-28"
          />

          {detectChanges && (
            <View className="flex-row mt-5 justify-between">
              <TouchableOpacity
                onPress={handleClose}
                className="flex-1 mr-2 bg-gray-200 py-3 rounded-xl"
              >
                <Text className="text-gray-700 font-semibold text-center">
                  Descartar cambios
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                className="flex-1 ml-2 bg-blue-700 py-3 rounded-xl"
              >
                <Text className="text-white font-semibold text-center">
                  Guardar
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={() =>
              Alert.alert("Eliminar tarea", "¿Seguro que deseas eliminarla?", [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Eliminar",
                  style: "destructive",
                  onPress: () => {
                    onDelete(tarea.id);
                    onClose();
                  },
                },
              ])
            }
            className="mt-6 flex-row justify-center items-center"
          >
            <Feather name="trash-2" size={20} color="red" />
            <Text className="text-red-600 font-bold ml-2">Eliminar tarea</Text>
          </TouchableOpacity>

          {/* CERRAR MODAL */}
          <TouchableOpacity onPress={handleClose} className="mt-5">
            <Text className="text-center text-blue-500 font-bold">Cerrar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}
