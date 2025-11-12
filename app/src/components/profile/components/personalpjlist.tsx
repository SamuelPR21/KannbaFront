import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface PersonalProject {
  id: string;
  title: string;
}

interface PersonalProjectListProps {
  personalProjects: PersonalProject[];
}

// Datos simulados (DUMMY_PROJECTS, ajustado para diferenciar)
const DUMMY_PERSONAL_PROJECTS = Array.from({ length: 15 }, (_, i) => ({
    id: `personal_proj${i + 1}`,
    title: `Proyecto Personal Nro ${i + 1}`,
}));

// Componente para renderizar cada ítem de proyecto
const PersonalProjectListItem = ({ title, index, isSelected, onPress }: { title: string, index: number, isSelected: boolean, onPress: () => void }) => (
    <TouchableOpacity
        className={`p-3 ${
            isSelected
                ? "bg-purple-500" // Cambiado el color para diferenciarlo visualmente
                : index % 2 === 0
                ? "bg-gray-100"
                : "bg-white"
        } ${
            // Borde inferior excepto en el último elemento
            index < DUMMY_PERSONAL_PROJECTS.length - 1 ? "border-b border-gray-200" : ""
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


export default function PersonalProjectList({ personalProjects = DUMMY_PERSONAL_PROJECTS }: PersonalProjectListProps) {
    // Estado interno para la selección (ajustado con un valor de ejemplo personal)
    const [proyectoPersonalSeleccionado, setProyectoPersonalSeleccionado] = React.useState("Proyecto Personal Nro 4");

    return (
        <View className="flex-1 mt-3"> 
            <Text className="text-lg font-semibold text-gray-800 mb-2">
                Proyectos Personales ({personalProjects.length}) {/* Título cambiado */}
            </Text>
            
            <View className="border border-gray-400 rounded-lg">
                <FlatList
                    data={personalProjects}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <PersonalProjectListItem 
                            title={item.title} 
                            index={index}
                            isSelected={item.title === proyectoPersonalSeleccionado}
                            onPress={() => setProyectoPersonalSeleccionado(item.title)}
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
    // Mantenemos la altura máxima para el scroll interno
    height: 250, 
  },
});