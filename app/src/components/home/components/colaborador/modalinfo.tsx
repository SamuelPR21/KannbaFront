import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; // CLAVE: useLocalSearchParams y useRouter

// --- COMPONENTE PRINCIPAL ---
export default function ModalInfo() {
  const router = useRouter(); 
  const params = useLocalSearchParams(); // <-- 1. Obtener los parámetros enviados

  // 2. Desestructurar los datos, proporcionando valores por defecto si la navegación falla
  const { 
    name = "Tarea sin nombre", 
    responsible = "Sin asignar", 
    description = "Sin descripción", 
    status = "Sin estado" 
  } = params as { 
    name: string; 
    responsible: string; 
    description: string; 
    status: string; 
  };
  
  // Estilos de texto consistentes con los títulos azules de tu app
  const labelStyle = "text-blue-700 font-semibold mb-1 ml-1";
  const valueStyle = "text-gray-800 text-base mb-4 border-b border-blue-300 pb-2";

  // Función auxiliar para obtener el nombre completo del responsable y el estado
  const getDisplayValue = (value: string, items: { label: string, value: string }[]) => {
    // Busca la etiqueta (label) correspondiente al valor (value) guardado
    const item = items.find(item => item.value === value);
    return item ? item.label : value;
  };

  // Las opciones deben ser importadas o definidas aquí (usamos las mismas que en ModalChange.tsx)
  const RESPONSIBLE_ITEMS = [
    { label: 'Diablo', value: 'user1' },
    { label: 'Danna', value: 'user2' },
    { label: 'Juanes', value: 'user3' },
  ];

  const STATUS_ITEMS = [
    { label: 'Back log', value: 'backlog' },
    { label: 'To do', value: 'todo' },
    { label: 'Doing', value: 'doing' },
    { label: 'Done', value: 'done' },
  ];

  // Convertir los valores guardados (ej: 'user2') a etiquetas (ej: 'Danna')
  const displayResponsible = getDisplayValue(responsible, RESPONSIBLE_ITEMS);
  const displayStatus = getDisplayValue(status, STATUS_ITEMS);


  return (
    <SafeAreaView className="flex-1 bg-gray-100">
        <View className="flex-1 justify-center items-center p-6">
            
            <View 
                className="w-full bg-white rounded-xl p-6 shadow-2xl max-w-md"
            >
                {/* Título */}
                <Text className="text-2xl font-bold text-gray-800 mb-8 text-center">
                    Información de la Tarea
                </Text>

                {/* --- Campo Nombre --- */}
                <Text className={labelStyle}>Nombre</Text>
                <Text className={valueStyle}>{name}</Text>

                {/* --- Campo Responsable --- */}
                <Text className={labelStyle}>Responsable</Text>
                {/* Muestra el nombre completo del responsable */}
                <Text className={valueStyle}>{displayResponsible}</Text> 

                {/* --- Campo Descripción --- */}
                <Text className={labelStyle}>Descripción</Text>
                <View className="border-b border-blue-300 mb-4 pb-2">
                    <Text className="text-gray-800 text-base">
                        {description}
                    </Text>
                </View>

                {/* --- Campo Estado --- */}
                <Text className={labelStyle}>Estado</Text>
                <View className="border-b border-blue-300 mb-6 pb-2">
                    {/* Muestra la etiqueta del estado */}
                    <Text className="text-gray-800 text-base font-bold text-blue-600"> 
                        {displayStatus}
                    </Text>
                </View>
                

                {/* --- Botón de Regreso (Atrás) --- */}
                <TouchableOpacity 
                    className="bg-black rounded-lg p-3 w-full items-center shadow-md mt-4"
                    onPress={() => router.back()}
                >
                    <Text className="text-white font-semibold">Cerrar</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    </SafeAreaView>
  );
}