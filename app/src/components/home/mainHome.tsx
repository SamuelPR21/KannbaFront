// src/components/home/mainHome.tsx
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import OrganizarSelector from "./components/organizarSelector";
import HomeProyecto from "./components/Proyecto/homeProyecto";
import HomeTablero from "./components/Tablero/homeTablero";
import TituloApp from "./components/tituloApp";

export default function HomeMain() {
  const [organizarPor, setOrganizarPor] = useState<"Personal" | "Proyecto">(
    "Personal",
  );

  const isPersonal = organizarPor === "Personal";

  return (
    <View className="flex-1 bg-blue-50">
      {/* 🔵 HEADER FIJO (logo + subtítulo) */}
      <View className="pt-8 px-4 pb-1">
        <TituloApp title="MIAU" />
      </View>

      {/* 🔽 CONTENIDO SCROLLEABLE */}
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Selector de vista */}
        <OrganizarSelector
          organizarPor={organizarPor}
          opciones={["Personal", "Proyecto"]}
          onSelect={(value) =>
            setOrganizarPor(value as "Personal" | "Proyecto")
          }
        />

        {/* Kanban / descripción (igual para personal y proyecto) */}
        <View className="mt-3 items-center">
          <View className="bg-blue-700 rounded-2xl px-4 py-3 shadow-md w-full items-center">
            <Text className="text-xl font-extrabold text-white text-center">
              Kanban Board
            </Text>
          </View>
          <Text className="mt-2 text-[12px] text-blue-700 text-center">
            Llevemos el control de cómo van tus proyectos y tareas personales.
          </Text>
        </View>

        {/* Contenido: tablero personal o proyectos */}
        <View className="mt-4">
          {isPersonal ? <HomeTablero /> : <HomeProyecto />}
        </View>
      </ScrollView>
    </View>
  );
}
