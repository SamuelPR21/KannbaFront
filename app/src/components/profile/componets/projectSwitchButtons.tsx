import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  selected: "projects" | "personal";
  onSelect: (v: "projects" | "personal") => void;
}

export default function ProjectSwitchButtons({ selected, onSelect }: Props) {
  return (
    <View className="flex-row gap-2 mb-3">
      <TouchableOpacity
        onPress={() => onSelect("projects")}
        className={`flex-row items-center px-3 py-2 rounded-lg ${
          selected === "projects" ? "bg-cyan-600" : "bg-cyan-100"
        }`}
      >
        <Text className={`${selected === "projects" ? "text-white" : "text-cyan-800"} font-semibold`}>
          Proyectos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onSelect("personal")}
        className={`flex-row items-center px-3 py-2 rounded-lg ${
          selected === "personal" ? "bg-indigo-600" : "bg-indigo-100"
        }`}
      >
        <Text className={`${selected === "personal" ? "text-white" : "text-indigo-800"} font-semibold`}>
          Tareas personales
        </Text>
      </TouchableOpacity>
    </View>
  );
}