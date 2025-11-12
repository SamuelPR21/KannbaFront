import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";


export default function PerfilUsuario() {
  const TAREAS_COMPLETADAS_PERCENT = 34;

  const [currentView, setCurrentView] = useState<ProjectView>('assigned');
  const navigation = useNavigation<any>();

  // --- Datos de Prueba ---
  const DUMMY_PROJECTS = Array.from({ length: 15 }, (_, i) => ({
      id: `proj${i + 1}`,
      title: `Proyecto Asignado  ${i + 1}`,
  }));
  
  const DUMMY_PERSONAL_PROJECTS = Array.from({ length: 15 }, (_, i) => ({
      id: `personal_proj${i + 1}`,
      title: `Proyecto Personal  ${i + 1}`,
  }));
  // -----------------------

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const goToIntoProyectManager = () => navigation.navigate("IntoToProyectManger")
  const proyectos = [
    "Proyecto 1",
    "Proyecto 2",
    "Proyecto 3",
    "Proyecto 4",
    "Proyecto 5",
    "Proyecto 6",
    "Proyecto 7",
    "Proyecto 8",
    "Proyecto 9",
  ];

  return (
    <SafeAreaView className="flex-1 bg-blue-50 pt-16 px-4 pb-16">
      
      {/* ... (Información del usuario) ... */}
      <View className="flex-row items-start justify-between mb-6 pt-10">
        <View className="flex-col ml-2">
          <Text className="text-lg font-semibold text-gray-800">Juan Tenorio</Text>
          <Text className="text-gray-600 text-base">66 años</Text>
          <Text className="text-gray-600 text-base">Juan_T32</Text>
        </View>
      </View>

      {/* BARRA DE PROGRESO */}
      <ProgressBar progress={TAREAS_COMPLETADAS_PERCENT} />
      
    {/* --- CONTENEDOR DE BOTONES DE VISTA --- */}
      <View className="flex-row justify-start mb-3 mt-4 gap-2"> 
          
          {/* 1. BOTÓN PROYECTOS (ASIGNADOS) */}
          <TouchableOpacity 
              onPress={showAssignedProjects} // 💡 Cambia la vista
              className={`${currentView === 'assigned' ? 'bg-blue-600' : 'bg-blue-300'} ${baseBtnClass}`}
          >
              <MaterialCommunityIcons name="view-dashboard-outline" size={20} color="white" />
              <Text className="text-white font-semibold text-sm ml-2">
                  Proyectos
              </Text>
          </TouchableOpacity>

      {/* Lista de proyectos */}
      <View className="border border-gray-400 rounded-lg">
        {proyectos.map((proyecto, index) => (
          <TouchableOpacity
            key={index}
            onPress={goToIntoProyectManager}
            className={`p-3 ${
              proyectoSeleccionado === proyecto
                ? "bg-blue-500"
                : index % 2 === 0
                ? "bg-gray-100"
                : "bg-white"
            }`}
          >
              <MaterialCommunityIcons name="plus" size={20} color="white" />
              <Text className="text-white font-semibold text-sm ml-1">
                  Proyectos personales
              </Text>
          </TouchableOpacity>

      </View>
      {/* Fin del Contenedor de Botones */}

      {/* --- RENDERIZACIÓN CONDICIONAL DE LA LISTA --- */}
      {currentView === 'assigned' && (
          <ProjectList 
              projects={DUMMY_PROJECTS} 
          /> 
      )}

      {currentView === 'personal' && (
          <PersonalProjectList 
              personalProjects={DUMMY_PERSONAL_PROJECTS} // Asegúrate de que el prop se llame personalProjects
          /> 
      )}
      
      <LogoutBtn onLogout={handleLogout} />
    </SafeAreaView>
  );
}