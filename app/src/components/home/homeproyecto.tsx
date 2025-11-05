import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Footer from "../../navigation/footer";

export default function HomeProyecto() {
  const router = useRouter();
  const [organizarPor, setOrganizarPor] = useState("Proyecto");
  const [mostrarOrganizar, setMostrarOrganizar] = useState(false);

  const tareasConProyecto = [
    { nombre: "Tarea 1", categoria: "Back log", proyecto: "Proyecto A" },
    { nombre: "Tarea 2", categoria: "Done", proyecto: "Proyecto A" },
    { nombre: "Tarea 3", categoria: "Doing", proyecto: "Proyecto A" },
    { nombre: "Tarea 4", categoria: "To Do", proyecto: "Proyecto A" },
    { nombre: "Tarea 5", categoria: "Doing", proyecto: "Proyecto A" },
    { nombre: "Tarea 6", categoria: "Done", proyecto: "Proyecto A" },
  ];

  const tareasSinProyecto = [
    { nombre: "Tarea 1", categoria: "Back log" },
    { nombre: "Tarea 2", categoria: "Done" },
    { nombre: "Tarea 3", categoria: "Doing" },
    { nombre: "Tarea 4", categoria: "To Do" },
    { nombre: "Tarea 5", categoria: "Doing" },
    { nombre: "Tarea 6", categoria: "Done" },
  ];

  const handleOrganizarSelect = (value: string) => {
    setOrganizarPor(value);
    setMostrarOrganizar(false);
    if (value === "Tablero") router.push("../layout/home");
  };

  return (
    <ScrollView className="flex-1 bg-blue-50 p-4">
      {/*Título principal */}
      <Text className="text-3xl font-bold text-center mb-6 text-blue-700">
        Kannba
      </Text>

      {/* Organizar por */}
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
          {["Proyecto", "Tablero"].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => handleOrganizarSelect(item)}
              className={`p-2 ${
                organizarPor === item ? "bg-blue-300" : "bg-blue-50"
              }`}
            >
              <Text className="text-blue-800">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ================= SECCIÓN CON PROYECTO ================= */}
      <Text className="font-semibold text-lg mt-4 mb-2 text-blue-900">
        Nombre Proyecto
      </Text>

      <View className="border border-blue-600 rounded-lg mb-6">
        <View className="flex-row justify-between px-3 py-2 border-b border-blue-600 bg-blue-200">
          <Text className="font-semibold w-1/2 text-blue-800">Nombre</Text>
          <Text className="font-semibold w-1/2 text-blue-800">Categoría</Text>
        </View>

        {tareasConProyecto.map((t, i) => (
          <View
            key={i}
            className={`flex-row justify-between px-3 py-2 ${
              i % 2 === 0 ? "bg-blue-100" : "bg-blue-50"
            }`}
          >
            {/* Botón por tarea */}
            <TouchableOpacity className="w-1/2">
              <Text className="text-blue-700 underline">{t.nombre}</Text>
            </TouchableOpacity>
            <Text className="w-1/2 text-blue-700">{t.categoria}</Text>
          </View>
        ))}
      </View>

      {/* ================= SECCIÓN SIN PROYECTO ================= */}
      <Text className="font-semibold text-lg mt-2 mb-2 text-blue-900">
        Sin Proyecto
      </Text>

      <View className="border border-blue-600 rounded-lg mb-10">
        <View className="flex-row justify-between px-3 py-2 border-b border-blue-600 bg-blue-200">
          <Text className="font-semibold w-1/2 text-blue-800">Nombre</Text>
          <Text className="font-semibold w-1/2 text-blue-800">Categoría</Text>
        </View>

        {tareasSinProyecto.map((t, i) => (
          <View
            key={i}
            className={`flex-row justify-between px-3 py-2 ${
              i % 2 === 0 ? "bg-blue-100" : "bg-blue-50"
            }`}
          >
            {/*Botón también aquí */}
            <TouchableOpacity className="w-1/2">
              <Text className="text-blue-700 underline">{t.nombre}</Text>
            </TouchableOpacity>
            <Text className="w-1/2 text-blue-700">{t.categoria}</Text>
          </View>
        ))}
      </View>

      <Footer />
    </ScrollView>
  );
}
