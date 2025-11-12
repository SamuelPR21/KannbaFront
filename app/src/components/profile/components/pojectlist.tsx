import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Project {
  id: string;
  title: string;
}

interface ProjectListProps {
  projects: Project[];
}

const DUMMY_PROJECTS = Array.from({ length: 15 }, (_, i) => ({
    id: `proj${i + 1}`,
    title: `Proyecto ${i + 1} de Desarrollo`,
}));

// Componente para renderizar cada ítem de proyecto
const ProjectListItem = ({ title, index, isSelected, onPress }: { title: string, index: number, isSelected: boolean, onPress: () => void }) => (
    <TouchableOpacity
        className={`p-3 ${
            isSelected
                ? "bg-blue-500"
                : index % 2 === 0
                ? "bg-gray-100"
                : "bg-white"
        } ${
            // Borde inferior excepto en el último elemento
            index < DUMMY_PROJECTS.length - 1 ? "border-b border-gray-200" : ""
        }`}
        onPress={onPress}
    >
        <Text
            className={`text-base ${
                isSelected
                    ? "text-white font-semibold"
                    : "text-gray-800"
            }`}
        >
            {title}
        </Text>
    </TouchableOpacity>
);


export default function ProjectList({ projects = DUMMY_PROJECTS }: ProjectListProps) {
    const [proyectoSeleccionado, setProyectoSeleccionado] = React.useState("Proyecto 4 de Desarrollo");

    return (
        <View className="flex-1 mt-3">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
                Proyectos Asignados ({projects.length})
            </Text>
            
            <View className="border border-gray-400 rounded-lg">
                <FlatList
                    data={projects}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <ProjectListItem 
                            title={item.title} 
                            index={index}
                            isSelected={item.title === proyectoSeleccionado}
                            onPress={() => setProyectoSeleccionado(item.title)}
                        />
                    )}
                    style={styles.listContainer} 
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

// Estilos para limitar la altura y activar el scroll interno
const styles = StyleSheet.create({
  listContainer: {
    // CLAVE: Define una altura máxima para que la lista se encoja y tenga scroll propio
    height: 250, 
  },
});