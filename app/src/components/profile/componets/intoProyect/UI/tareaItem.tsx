import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    LayoutAnimation,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Tarea = {
  id: string;
  nombre: string;
  descripcion: string;
  responsable: string;
  estado: "Back Log" | "To Do" | "Doing" | "Done";
};

type Props = {
  tarea: Tarea;
  rol: "manager" | "colaborador";
  onUpdate: (tarea: Tarea) => void;
  onDelete: (id: string) => void;
};

export default function TareaItem({ tarea, rol, onUpdate, onDelete }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [nombre, setNombre] = useState(tarea.nombre);
  const [descripcion, setDescripcion] = useState(tarea.descripcion);
  const [responsable, setResponsable] = useState(tarea.responsable);
  const [modalResponsable, setModalResponsable] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // Mock usuarios
  const usuarios = [
    "Samuel",
    "Laura",
    "Andrés",
    "María",
    "Jorge",
    "Camila",
    "Valentina",
  ];

  const usuariosFiltrados = usuarios.filter((u) =>
    u.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSaveChange = (key: keyof Tarea, value: string) => {
    onUpdate({ ...tarea, [key]: value });
  };

  const getEstadoColor = (estado: Tarea["estado"]) => {
    switch (estado) {
      case "Back Log":
        return "bg-gray-400";
      case "To Do":
        return "bg-yellow-400";
      case "Doing":
        return "bg-blue-600";
      case "Done":
        return "bg-green-600";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <View className="bg-white mb-3 rounded-xl shadow-md border border-blue-200 p-3">
      {/* Parte superior */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            {rol === "manager" ? (
              <TextInput
                value={nombre}
                onChangeText={(text) => {
                  setNombre(text);
                  handleSaveChange("nombre", text);
                }}
                className="text-blue-900 font-bold text-lg border-b border-blue-300 flex-1 mr-2"
              />
            ) : (
              <Text className="text-blue-900 font-bold text-lg flex-1 mr-2">
                {nombre}
              </Text>
            )}

            {/* Tag de estado */}
            <View
              className={`px-3 py-1 rounded-lg ${getEstadoColor(
                tarea.estado
              )}`}
            >
              <Text className="text-white font-semibold text-xs">
                {tarea.estado}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mt-1">
            <Text className="text-blue-700 font-semibold">Responsable:</Text>
            <Text className="ml-1 text-blue-500">{responsable}</Text>

            {rol === "manager" && (
              <TouchableOpacity
                onPress={() => setModalResponsable(true)}
                className="ml-2"
              >
                <Feather name="edit-2" size={18} color="#2563eb" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Botón eliminar */}
        {rol === "manager" && (
          <TouchableOpacity
            onPress={() => onDelete(tarea.id)}
            className="bg-red-500 rounded-full p-2 ml-2"
          >
            <Feather name="minus" size={18} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Botón de descripción */}
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setExpanded(!expanded);
        }}
        className="mt-2"
      >
        <Text className="text-blue-600 font-semibold">
          {expanded ? "Ocultar descripción ▲" : "Ver descripción ▼"}
        </Text>
      </TouchableOpacity>

      {/* Descripción expandida */}
      {expanded && (
        <View className="mt-2">
          {rol === "manager" ? (
            <TextInput
              multiline
              value={descripcion}
              onChangeText={(text) => {
                setDescripcion(text);
                handleSaveChange("descripcion", text);
              }}
              className="border border-blue-300 bg-blue-50 rounded p-2 text-blue-900"
            />
          ) : (
            <Text className="text-blue-800">{descripcion}</Text>
          )}
        </View>
      )}

      {/* Modal cambiar responsable */}
      <Modal visible={modalResponsable} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-11/12 rounded-2xl p-4">
            <Text className="text-xl font-bold text-blue-900 mb-2 text-center">
              Cambiar Responsable
            </Text>
            <TextInput
              placeholder="Buscar usuario..."
              placeholderTextColor="#6b7280"
              value={busqueda}
              onChangeText={setBusqueda}
              className="border border-blue-300 rounded px-3 py-2 mb-3 bg-blue-50"
            />

            <FlatList
              data={usuariosFiltrados}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setResponsable(item);
                    handleSaveChange("responsable", item);
                    setModalResponsable(false);
                    setBusqueda("");
                  }}
                  className="p-2 border-b border-blue-100"
                >
                  <Text className="text-blue-700">{item}</Text>
                </TouchableOpacity>
              )}
              style={{ maxHeight: 200 }}
            />

            <TouchableOpacity
              onPress={() => setModalResponsable(false)}
              className="mt-4 bg-red-500 py-2 rounded-lg"
            >
              <Text className="text-white font-bold text-center">Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
