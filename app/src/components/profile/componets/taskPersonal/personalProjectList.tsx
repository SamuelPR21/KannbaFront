import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getTaskes } from "../../../../API/task_personal";
import { TaskPersonal } from "../../types";

export default function PersonalProjectList( ) {

  const [personalTasks, setPersonalTasks] = React.useState<TaskPersonal[]>([]);

  useEffect(() => {
    const fetchPersonalProjects = async () => {
      try {
        const data = await getTaskes();
        setPersonalTasks(data ?? []);
      } catch (error) {
        console.error("Error fetching personal projects:", error);
      }
    };

    fetchPersonalProjects();
  }, []); 

  return (
    <View className="border border-gray-200 rounded-lg p-2">
      <Text className="text-lg font-semibold mb-2">
        Tareas Personales ({personalTasks.length})
      </Text>

      <ScrollView nestedScrollEnabled style={{ maxHeight: 300 }}>
        {personalTasks.map((p, i) => (
          <TouchableOpacity
            key={p.id}
            className={`p-3 rounded-md mb-2 ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <Text className="text-base font-medium text-gray-800">
              {p.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}