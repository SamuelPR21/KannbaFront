import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getTaskes } from "../../../../API/task_personal";
import { TaskPersonal } from "../../types";

export default function PersonalProjectList({
  tasks,
  onItemPress,
  onDelete,
}: {
  tasks: TaskPersonal[] | any[];
  onItemPress: (t: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <View className="border border-gray-200 rounded-lg p-2">
      <Text className="text-lg font-semibold mb-2">
        Tareas Personales ({tasks?.length ?? 0})
      </Text>

      <ScrollView nestedScrollEnabled style={{ maxHeight: 300 }}>
        {tasks?.map((p, i) => (
          <View
            key={p.id}
            className={`flex-row items-center justify-between p-3 rounded-md mb-2 ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <TouchableOpacity
              className="flex-1 pr-2"
              onPress={() => onItemPress(p)}
            >
              <Text className="text-base font-medium text-gray-800">
                {p.nombre ?? p.name}
              </Text>
              <Text className="text-sm text-gray-500">
                {p.descripcion ?? p.description}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onDelete(String(p.id))}
              className="ml-2 px-3 py-1 rounded-md bg-red-100"
            >
              <Text className="text-red-600 font-bold">✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}