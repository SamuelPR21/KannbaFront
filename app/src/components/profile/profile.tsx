import React, { useState } from "react"; // 💡 Importar useState
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProgressBar from "./components/progressbar"; // Barra de Progreso
import ProjectList from "./components/pojectlist"; // Lista de Proyectos Asignados
import PersonalProjectList from "./components/personalpjlist"; // 💡 Importar lista personal
import LogoutBtn from "./components/logoutbtn"; //Importar botón de cierre de sesión
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

// Definición de tipos de vista para mayor claridad
type ProjectView = 'assigned' | 'personal';

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

  // Función para cambiar a Proyectos Asignados
  const showAssignedProjects = () => {
    setCurrentView('assigned');
    // Si necesitas navegar a una pantalla completa, úsala aquí: navigation.navigate('ProjectListScreen');
  };

  // Función para cambiar a Proyectos Personales
  const showPersonalProjects = () => {
    setCurrentView('personal');
    // Si necesitas navegar a una pantalla completa, úsala aquí: navigation.navigate('PersonalProjectsScreen');
  };
  
  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigation.navigate('Login'); // Ajusta según tu configuración de navegación
  };
    
  // Clase base para el estilo del botón
  const baseBtnClass = "flex-1 flex-row items-center justify-center rounded-lg shadow-md px-4 py-2";

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

          {/* 2. BOTÓN PROYECTOS PERSONALES */}
          <TouchableOpacity 
              onPress={showPersonalProjects} // 💡 Cambia la vista
              className={`${currentView === 'personal' ? 'bg-green-600' : 'bg-green-300'} ${baseBtnClass}`}
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