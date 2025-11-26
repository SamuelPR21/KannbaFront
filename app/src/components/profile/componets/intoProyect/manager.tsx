import { listUsersInProject } from "@/app/src/API/user_proyect";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import CategoriaTabs, { Categoria } from "../../../home/components/Tablero/categoriasTabs";
import { ProjectItem } from "../../types";
import BottomBackProfile from "./UI/bottomBackProfile";
import ListaIntegrantes from "./UI/listaIntegrantes";
import ListaTareas from "./UI/listaTareas";
import BottomAñadirIntegrante from "./UI/manager/bottomAñadirIntegrante";
import BottomAñadirTarea from "./UI/manager/bottomAñadirTarea";
import Titulo from "./UI/titiulo";
type Usuario = any;


export default function Manager({ refreshFlag }: { refreshFlag?: number }) {
  const { params } = useRoute();
  const { project } = params as { project: ProjectItem };
  const [integrantes, setIntegrantes] = useState<Usuario[]>([]);
  const [nuevoIntegrante, setNuevoIntegrante] = useState<Usuario | null>(null);


  const [selectedCategory, setSelectedCategory] = useState<Categoria>("To Do");

  return (
    <View className="flex-1 bg-blue-50 pt-16 px-4 pb-16">
      <Titulo 
        title={project.proyectName}
        categoria={project.categoryName}
      />

      <View className="flex-row justify-between items-start">
        <ListaIntegrantes
          {...({ projectId: project.proyectId, integrantes, setIntegrantes } as any)}
        />

        <BottomAñadirIntegrante 
          projectId={project.proyectId} 
            agregarIntegrante={() => {
              listUsersInProject(project.proyectId).then(users => {
                setIntegrantes(
                  (users ?? []).map(user => ({
                    id: String(user.userProyectId),
                    userId: String(user.userId),
                    nombre: user.userName,
                    rol: user.role === "MANAGER" ? "1" : user.role === "COLABORADOR" ? "2" : null
                  }))
                );
              });
            }}
        />
      </View>

      <BottomAñadirTarea proyectId={String(project.proyectId)} />

      <CategoriaTabs
        categorias={["Back Log", "To Do", "Doing", "Done"]}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <ListaTareas 
        rol="manager" 
        filtroCategoria={selectedCategory}
        proyectId={project.proyectId} 
      />
      <BottomBackProfile />
    </View>
  );
}