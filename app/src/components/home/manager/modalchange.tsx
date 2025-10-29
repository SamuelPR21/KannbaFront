import { useState, useMemo } from 'react';
import { 
  Alert, Text, TextInput, TouchableOpacity, View, 
  TouchableWithoutFeedback, Keyboard // <-- Importaciones para cerrar teclado
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRouter } from 'expo-router'; 

// --- CONSTANTES DE OPCIONES PARA DROPDOWNS ---
const RESPONSIBLE_ITEMS = [
  { label: 'Pepito1', value: 'Pepito1' },
  { label: 'María G.', value: 'MariaG' },
  { label: 'Carlos T.', value: 'CarlosT' },
];

const STATUS_ITEMS = [
  { label: 'Back log', value: 'backlog' },
  { label: 'To do', value: 'todo' },
  { label: 'Doing', value: 'doing' },
  { label: 'Done', value: 'done' },
];

// --- DATOS INICIALES SIMULADOS ---
const TASK_DATA_FROM_DB = {
    name: "Corregir Bugs de Login",
    description: "Revisar y arreglar el error de autenticación en la pantalla de login.",
    responsible: RESPONSIBLE_ITEMS[1].value, 
    status: STATUS_ITEMS[1].value, 
};

const ErrorText = ({ message }: { message?: string }) => 
  message ? <Text className="text-red-600 text-xs mb-2 ml-1">{message}</Text> : null;

// --- COMPONENTE PRINCIPAL ---
export default function ModalChange() {
  const router = useRouter(); 

  const [initialTask, setInitialTask] = useState(TASK_DATA_FROM_DB);
  const [taskName, setTaskName] = useState(initialTask.name);
  const [description, setDescription] = useState(initialTask.description);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [openResponsible, setOpenResponsible] = useState(false);
  const [responsible, setResponsible] = useState(initialTask.responsible); 
  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState(initialTask.status); 

  // --- LÓGICA DE DETECCIÓN DE CAMBIOS (isModified) ---
  const isModified = useMemo(() => {
    return (
      taskName !== initialTask.name ||
      description !== initialTask.description ||
      responsible !== initialTask.responsible ||
      status !== initialTask.status
    );
  }, [taskName, description, responsible, status, initialTask]);
  
  // ESTILOS NATIVEWIND ACTUALIZADOS A AZUL
  const inputStyle = "border-2 border-blue-300 rounded-lg px-3 py-3 w-full text-base leading-tight text-gray-800 focus:border-blue-500";
  const inputContainerStyle = "mb-4";
  
  // El color del borde debe coincidir con el del input
  const dropdownBorderColor = '#93C5FD'; // blue-300
  const dropdownStyle = { 
    borderColor: dropdownBorderColor, 
    borderWidth: 2, // Aumentado a 2 para igualar el input
    borderRadius: 8, // Aumentado a 8 para igualar el input
    minHeight: 45 
  };
  
  const onResponsibleOpen = () => { setOpenStatus(false); };
  const onStatusOpen = () => { setOpenResponsible(false); };

  // --- LÓGICA DE MANEJO Y VALIDACIÓN ---
  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!taskName.trim()) {
      newErrors.taskName = 'El nombre es obligatorio.';
      valid = false;
    }
    if (!description.trim()) {
      newErrors.description = 'La descripción es obligatoria.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (isModified && validateForm()) {
      const updatedTaskData = { 
        name: taskName, 
        responsible, 
        description, 
        status 
      };
      
      console.log("Tarea Guardada en DB:", updatedTaskData);
      setInitialTask(updatedTaskData); 

      Alert.alert(
          "Cambios Guardados",
          `La tarea "${taskName}" ha sido actualizada con éxito.`,
          [{ text: "OK" }]
      );
    } else if (!isModified) {
         Alert.alert("Sin Cambios", "No se ha detectado ninguna modificación para guardar.");
    } else {
        Alert.alert("Error", "Por favor, complete todos los campos obligatorios.");
    }
  };
  
  const handleGoBack = () => {
    Keyboard.dismiss(); 
    router.back(); 
  };


  return (
    // CLAVE: Envolvemos el contenido con TouchableWithoutFeedback para cerrar el teclado
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-gray-100 justify-center items-center p-6">
        
        <View 
          className="w-full bg-white rounded-xl p-6 shadow-2xl"
        >
          <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">Editar Tarea</Text>

          {/* --- Campo Nombre --- */}
          <Text className="text-blue-700 mb-1 ml-1 mt-2 font-semibold">Nombre</Text>
          <View className={inputContainerStyle}>
            <TextInput
              className={inputStyle} // ESTILO AZUL APLICADO
              value={taskName}
              onChangeText={setTaskName}
              onBlur={() => validateForm()}
              placeholder="Nombre de la tarea"
              placeholderTextColor="#6B7280"
            />
            <ErrorText message={errors.taskName} />
          </View>

          {/* --- Dropdown Responsable --- */}
          <Text className="text-blue-700 mb-1 ml-1 mt-2 font-semibold">Responsable</Text>
          <View style={{ zIndex: 3000, marginBottom: openResponsible ? 150 : 20 }}>
            <DropDownPicker
              open={openResponsible}
              value={responsible}
              items={RESPONSIBLE_ITEMS}
              setOpen={setOpenResponsible}
              setValue={setResponsible}
              onOpen={onResponsibleOpen}
              placeholder="Seleccione un responsable"
              style={dropdownStyle} // ESTILO AZUL APLICADO
              dropDownContainerStyle={dropdownStyle} // ESTILO AZUL APLICADO
              listMode="SCROLLVIEW" 
            />
          </View>

          {/* --- Campo Descripción --- */}
          <Text className="text-blue-700 mb-1 ml-1 mt-2 font-semibold">Descripción</Text>
          <View className={inputContainerStyle}>
            <TextInput
              className={inputStyle} // ESTILO AZUL APLICADO
              value={description}
              onChangeText={setDescription}
              onBlur={() => validateForm()}
              multiline
              numberOfLines={4}
              placeholder="Detalles de la tarea"
              placeholderTextColor="#6B7280"
              style={{ minHeight: 80, textAlignVertical: 'top' }} 
            />
            <ErrorText message={errors.description} />
          </View>

          {/* --- Dropdown Estado (Status) --- */}
          <Text className="text-blue-700 mb-1 ml-1 mt-2 font-semibold">Estado</Text>
          <View style={{ zIndex: 2000, marginBottom: openStatus ? 160 : 30 }}>
            <DropDownPicker
              open={openStatus}
              value={status}
              items={STATUS_ITEMS}
              setOpen={setOpenStatus}
              setValue={setStatus}
              onOpen={onStatusOpen}
              placeholder="Seleccione el estado"
              style={dropdownStyle} // ESTILO AZUL APLICADO
              dropDownContainerStyle={dropdownStyle} // ESTILO AZUL APLICADO
              listMode="SCROLLVIEW" 
            />
          </View>

          {/* --- Botones --- */}
          <View className="flex-row justify-between mt-4 mb-4">
            <TouchableOpacity 
              className="flex-1 bg-black rounded-lg p-3 items-center mr-2 shadow-md"
              onPress={handleGoBack}
            >
              <Text className="text-white font-semibold">Atrás</Text>
            </TouchableOpacity>

            {/* Renderizado Condicional: Solo aparece si hay algún cambio detectado */}
            {isModified && (
              <TouchableOpacity 
                className="flex-1 bg-blue-600 rounded-lg p-3 items-center ml-2 shadow-md"
                onPress={handleSubmit}
              >
                <Text className="text-white font-semibold">Guardar Cambios</Text>
              </TouchableOpacity>
            )}
          </View>
          
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}