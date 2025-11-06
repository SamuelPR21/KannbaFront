import { useState } from "react";
import { ScrollView, View } from "react-native";
import useTareas from "../../hooks/useTareas";
import CategoriasTabs from "./categoriasTabs";
import PrioridadSelector from "./prioridadSelector";
import TablaTareas from "./tablaTareas";


export default function HomeTablero() {

  const [selectedCategory, setSelectedCategory] = useState("To Do");
  const [selectedPriority, setSelectedPriority] = useState("Alta");

  const { tareasFiltradas } = useTareas(selectedCategory, selectedPriority);


  return (
    <ScrollView className="flex-1 bg-blue-50 pt-14 px-4 pb-16">
      <CategoriasTabs
        categorias={["To Do", "Doing", "Done"]}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <PrioridadSelector
        selectedPriority={selectedPriority}
        onSelect={setSelectedPriority}
      />

      <View className="mt-4">
        <TablaTareas tareas={tareasFiltradas} />
      </View>

    </ScrollView>

  )
}



