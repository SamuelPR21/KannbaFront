import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Footer from "../../navigation/footer";

export default function HomeTablero() {
  const router = useRouter();

  const [organizarPor, setOrganizarPor] = useState("Tablero");
  const [mostrarOrganizar, setMostrarOrganizar] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("Alta");
  const [mostrarPrioridad, setMostrarPrioridad] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("To Do");

  const tareas = [
    { nombre: "Tarea 1", prioridad: "Media", proyecto: "Proyecto 1", estado: "To Do" },
    { nombre: "Tarea 2", prioridad: "Baja", proyecto: "Proyecto 2", estado: "To Do" },
    { nombre: "Tarea 3", prioridad: "Alta", proyecto: "Proyecto 3", estado: "To Do" },
    { nombre: "Tarea 4", prioridad: "Baja", proyecto: "Proyecto 4", estado: "To Do" },
    { nombre: "Tarea 5", prioridad: "Alta", proyecto: "Proyecto 5", estado: "To Do" },
    { nombre: "Tarea 6", prioridad: "Media", proyecto: "Proyecto 6", estado: "To Do" },
    { nombre: "Tarea 7", prioridad: "Baja", proyecto: "Proyecto 7", estado: "To Do" },
    { nombre: "Tarea 8", prioridad: "Alta", proyecto: "Proyecto 8", estado: "To Do" },
  ];

  const tareasFiltradas = tareas.filter(
    (t) => t.estado === selectedCategory && t.prioridad === selectedPriority
  );

 const handleOrganizarSelect = (value: string) => {
  setOrganizarPor(value);
  setMostrarOrganizar(false);
  if (value === "Proyecto") router.push("../layout/homeproyecto");
};

  return (
    <ScrollView className="flex-1 bg-blue-50 p-4">
      {/* Título */}
      <Text className="text-3xl font-bold text-center mb-6 text-blue-700">
        Kannba
      </Text>

      {/* ORGANIZAR POR */}
      <Text className="font-semibold mb-1 text-blue-800">Organizar por:</Text>
      <TouchableOpacity
        onPress={() => setMostrarOrganizar(!mostrarOrganizar)}
        className="border border-blue-500 rounded p-2 mb-2 flex-row justify-between bg-blue-100"
      >
        <Text className="text-blue-700">{organizarPor}</Text>
        <Text className="text-blue-700">▼</Text>
      </TouchableOpacity>

      {mostrarOrganizar && (
        <View className="border border-blue-300 rounded mb-3 bg-blue-100">
          {["Tablero", "Proyecto"].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => handleOrganizarSelect(item)}
              className={`p-2 ${organizarPor === item ? "bg-blue-300" : "bg-blue-50"}`}
            >
              <Text className="text-blue-800">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* CATEGORÍAS */}
      <View className="flex-row justify-around mb-3 mt-4">
        {["To Do", "Doing", "Done"].map((item) => (
          <TouchableOpacity key={item} onPress={() => setSelectedCategory(item)}>
            <Text
              className={`font-semibold ${
                selectedCategory === item
                  ? "border-b-2 border-blue-700 text-blue-700"
                  : "text-blue-500"
              }`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* PRIORIDAD */}
      <Text className="font-semibold mb-1 mt-4 text-blue-800">Prioridad</Text>
      <TouchableOpacity
        onPress={() => setMostrarPrioridad(!mostrarPrioridad)}
        className="border border-blue-500 rounded p-2 mb-2 flex-row justify-between bg-blue-100"
      >
        <Text className="text-blue-700">{selectedPriority}</Text>
        <Text className="text-blue-700">▼</Text>
      </TouchableOpacity>

      {mostrarPrioridad && (
        <View className="border border-blue-300 rounded mb-4 bg-blue-100">
          {["Alta", "Media", "Baja"].map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => {
                setSelectedPriority(p);
                setMostrarPrioridad(false);
              }}
              className={`p-2 ${selectedPriority === p ? "bg-blue-300" : "bg-blue-50"}`}
            >
              <Text className="text-blue-800">{p}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* TABLA DE TAREAS */}
      <View className="border border-blue-600 rounded-lg mt-2">
        <View className="flex-row justify-between px-3 py-2 border-b border-blue-600 bg-blue-200">
          <Text className="font-semibold w-1/3 text-blue-800">Nombre</Text>
          <Text className="font-semibold w-1/3 text-blue-800">Prioridad</Text>
          <Text className="font-semibold w-1/3 text-blue-800">Proyecto</Text>
        </View>

        {tareasFiltradas.length === 0 ? (
          <Text className="text-center py-4 text-blue-500">No hay tareas</Text>
        ) : (
          tareasFiltradas.map((t, i) => (
            <View
              key={i}
              className={`flex-row justify-between px-3 py-2 ${
                i % 2 === 0 ? "bg-blue-100" : "bg-blue-50"
              }`}
            >
              {/* Botón para cada tarea */}
              <TouchableOpacity className="w-1/3">
                <Text className="text-blue-700 underline">{t.nombre}</Text>
              </TouchableOpacity>
              <Text className="w-1/3 text-blue-700">{t.prioridad}</Text>
              <Text className="w-1/3 text-blue-700">{t.proyecto}</Text>
            </View>
          ))
        )}
      </View>

      <Footer />
    </ScrollView>
  );
}




