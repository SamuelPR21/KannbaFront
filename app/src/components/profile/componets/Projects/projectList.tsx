import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { deleteProject } from "../../../../API/proyect";
import { getUserProjects } from "../../../../API/user_proyect";
import { RootStackParamList } from "../../../../navigation/types";
import { ProjectItem } from "../../types";

export default function ProjectList({ refreshFlag }: { refreshFlag?: number }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [projects, setProjects] = useState<ProjectItem[]>([]);

  const handleIntoToProyect = (project: ProjectItem) => {
    if(project.role === "MANAGER"){
      navigation.navigate("IntoToProyectManger");
    }else if (project.role === "COLABORADOR"){
      navigation.navigate("IntoToProyectColaborador");
    }else{
      alert("Rol de proyecto no reconocido.");
      return;
    }
  };


  const handleDeleteProject = (projectId: number | string, proyectName: string) => {
    Alert.alert(
      `Eliminar proyecto`,
      `¿Estás seguro que deseas eliminar "${proyectName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
            const id = Number(projectId);
            if (Number.isNaN(id)) {
              alert("ID de proyecto inválido.");
              return;
            }
            deleteProject(id)
              .then(() => {
                setProjects(prev => prev.filter(p => String(p.proyectId) !== String(projectId)));
                alert(`Proyecto "${proyectName}" eliminado exitosamente.`);
              })
              .catch((error) => {
                alert(`Error al eliminar el proyecto: ${error.message}`);
              });
        } }
      ]
    );
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (!storedUser) return;

        const user = JSON.parse(storedUser);
        console.log('ProjectList fetching for user id ->', user.id);
        const data = await getUserProjects(user.id);

        if (data) setProjects(data);
      } catch (error) {
        console.log("❌ Error al obtener proyectos:", error);
      }
    };

    fetchProjects();
    const unsubscribe = navigation.addListener("focus", fetchProjects);
    return unsubscribe;
  }, [navigation, refreshFlag]);

  return (
    <View className="border border-gray-200 rounded-lg p-2">
      <Text className="text-lg font-semibold mb-2">
        Proyectos ({projects.length})
      </Text>
      <ScrollView nestedScrollEnabled style={{ maxHeight: 300 }}>
        {projects.map((p, i) => (
          <TouchableOpacity
            key={p.proyectId}
            className={`relative p-3 rounded-md mb-2 ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
            onPress={() => handleIntoToProyect(p)}
          >
            <Text className="text-base font-medium text-gray-800">
              {p.proyectName}
            </Text>
            <Text className="text-xs text-gray-500">{p.categoryName}</Text>
            <Text className="text-xs text-gray-500">{p.role}</Text>

            {p.role === "MANAGER" && (
            <TouchableOpacity
              className="absolute top-2 right-2 bg-red-500 rounded-full w-7 h-7 items-center justify-center"
              onPress={() => handleDeleteProject(p.proyectId, p.proyectName)}
            >
              <Text className="text-white font-bold text-sm">×</Text>
            </TouchableOpacity>
            )}


          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
