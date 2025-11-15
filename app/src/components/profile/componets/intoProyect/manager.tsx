import React, { useState } from "react";
import { View } from "react-native";
import CategoriaTabs, { Categoria } from "../../../home/components/Tablero/categoriasTabs";
import BottomBackProfile from "./UI/bottomBackProfile";
import ListaIntegrantes from "./UI/listaIntegrantes";
import ListaTareas from "./UI/listaTareas";
import BottomAñadirIntegrante from "./UI/manager/bottomAñadirIntegrante";
import BottomAñadirTarea from "./UI/manager/bottomAñadirTarea";
import Titulo from "./UI/titiulo";

export default function Manager() {
  const usuariosDisponibles = [
    { id: "4", nombre: "Laura Torres" },
    { id: "5", nombre: "Pedro Alvarez" },
    { id: "6", nombre: "Ana Ramirez" },
  ];

  const [selectedCategory, setSelectedCategory] = useState<Categoria>("To Do");

  return (
    <View className="flex-1 bg-blue-50 pt-16 px-4 pb-16">
      <Titulo title="Título del proyecto" categoria="Categoría del proyecto" />

      <View className="flex-row justify-between items-start">
        <ListaIntegrantes
          agregarIntegrante={(usuario) => console.log("Agregar:", usuario)}
        />
        <BottomAñadirIntegrante
          usuarios={usuariosDisponibles}
          agregarIntegrante={(usuario) => console.log("Agregar desde modal:", usuario)}
        />
      </View>

      <BottomAñadirTarea />

      <CategoriaTabs
        categorias={["Back Log", "To Do", "Doing", "Done"]}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <ListaTareas rol="manager" filtroCategoria={selectedCategory} />
      <BottomBackProfile />
    </View>
  );
}