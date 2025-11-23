import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getUserProjects } from "../../../API/user_proyect";
import { RootStackParamList } from "../../../navigation/types";
import { ProjectItem } from "../types";

export default function ProjectList({ refreshFlag }: { refreshFlag?: number }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [projects, setProjects] = useState<ProjectItem[]>([]);

  const handleIntoToProyect = () => {
    navigation.navigate("IntoToProyectManger");
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (!storedUser) return;

        const user = JSON.parse(storedUser);
        // Debug: mostrar id enviado
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
            className={`p-3 rounded-md mb-2 ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
            onPress={handleIntoToProyect}
          >
            <Text className="text-base font-medium text-gray-800">
              {p.proyectName}
            </Text>
            <Text className="text-xs text-gray-500">{p.categoryName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
