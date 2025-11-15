import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../navigation/types";
import { ProjectItem } from "../types";


interface Props {
  projects: ProjectItem[];
  onItemPress: (id: string) => void;
}

export default function ProjectList({ projects, onItemPress }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleIntoToProyect = () => {
    navigation.navigate("IntoToProyectManger");
  }

  return (


    <View className="border border-gray-200 rounded-lg p-2">
      <Text className="text-lg font-semibold mb-2">Proyectos ({projects.length})</Text>
      <ScrollView nestedScrollEnabled style={{ maxHeight: 300 }}>
        {projects.map((p, i) => (
          <TouchableOpacity
            key={p.id}
            className={`p-3 rounded-md mb-2 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            onPress={handleIntoToProyect}
          >
            <Text className="text-base font-medium text-gray-800">{p.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
