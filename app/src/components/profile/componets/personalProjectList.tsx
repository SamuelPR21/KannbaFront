import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../navigation/types";
import { ProjectItem } from "../types";

interface Props {
  personalProjects: ProjectItem[];
  onItemPress: (id: string) => void;
}




export default function PersonalProjectList({ personalProjects, onItemPress }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleIntoToProyect = () => {
    navigation.navigate("IntoToProyectColaborador")
  }

  return (
    <View className="border border-gray-200 rounded-lg p-2">
      <Text className="text-lg font-semibold mb-2">Tareas Personales ({personalProjects.length})</Text>
      <ScrollView nestedScrollEnabled style={{ maxHeight: 300 }}>
        {personalProjects.map((p, i) => (
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