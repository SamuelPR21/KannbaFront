import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// Componente auxiliar para mostrar el error en rojo debajo del campo.
const ErrorText = ({ message }: { message?: string }) => 
  message ? <Text className="text-red-600 text-xs mb-2 ml-1">{message}</Text> : null;

export default function RegisterScreen() {
  const router = useRouter(); 

  // ESTADOS DEL FORMULARIO
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  
  // ESTADOS DEL SELECTOR DE FECHA
  const initialDateDisplay = 'YYYY-MM-DD';
  const [birthDate, setBirthDate] = useState(new Date()); 
  const [birthDateDisplay, setBirthDateDisplay] = useState(initialDateDisplay); 
  const [showDatePicker, setShowDatePicker] = useState(false); 

  // ESTADO DE ERRORES 
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ESTADOS DEL DROPDOWN
  const [openPet, setOpenPet] = useState(false);
  const [selectedPet, setSelectedPet] = useState('gato');
  const [itemsPet, setItemsPet] = useState([
    {label: 'Gato', value: 'gato'},
    {label: 'Perro', value: 'perro'},
  ]);

  const [openPurpose, setOpenPurpose] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('estudio');
  const [itemsPurpose, setItemsPurpose] = useState([
    {label: 'Estudio', value: 'estudio'},
    {label: 'Trabajo', value: 'trabajo'},
    {label: 'Personal', value: 'personal'},
  ]);

  // REGEX Y CONSTANTES DE VALIDACIÓN
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const minPasswordLength = 6;


  // FUNCIÓN CENTRAL PARA VALIDAR UN SOLO CAMPO
  const validateField = (name: string, value: string) => {
    let error = '';
    if (!value.trim()) {
      error = 'Este campo es obligatorio.';
    } else {
      switch (name) {
        case 'email':
          if (!emailRegex.test(value)) {
            error = 'Formato de correo inválido.';
          }
          break;
        case 'fullName':
          if (!nameRegex.test(value)) {
            error = 'Solo se permiten letras y espacios.';
          }
          break;
        case 'password':
          if (value.length < minPasswordLength) {
            error = `Mínimo ${minPasswordLength} caracteres.`;
          }
          break;
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };
  
  // FUNCIÓN ESPECÍFICA PARA VALIDAR LA FECHA
  const validateBirthDate = () => {
    let error = '';
    if (birthDateDisplay === initialDateDisplay) {
      error = 'Debe seleccionar su fecha de nacimiento.';
    }
    setErrors(prev => ({ ...prev, birthDate: error }));
    return !error;
  };

  // FUNCIÓN PARA VALIDAR TODOS LOS CAMPOS ANTES DE ENVIAR
  const validateAllFields = () => {
    const isUsernameValid = validateField('username', username);
    const isEmailValid = validateField('email', email);
    const isFullNameValid = validateField('fullName', fullName);
    const isPasswordValid = validateField('password', password);
    const isOccupationValid = validateField('occupation', occupation);
    const isBirthDateValid = validateBirthDate();
    
    return isUsernameValid && isEmailValid && isFullNameValid && isPasswordValid && isOccupationValid && isBirthDateValid;
  };

  const handleRegister = () => {
    if (!validateAllFields()) {
      Alert.alert("Error de Formulario", "Por favor, corrija los errores marcados y complete todos los campos.");
      return; 
    }
    
    const formattedBirthDate = birthDate.toISOString().substring(0, 10);
    console.log('Registering user with:', { username, email, fullName, password, occupation, formattedBirthDate, selectedPet, selectedPurpose });
    
    Alert.alert(
      "Registro Exitoso",
      "Tu cuenta ha sido creada correctamente.",
      [
        // Redirigir a la pantalla de login
        { text: "OK", onPress: () => { router.push('/src/login'); } } 
      ]
    );
  };

  // ESTILOS BASE DE NATIVEWIND
  const inputStyle = "border-2 border-blue-300 rounded-lg p-3 w-full text-base text-gray-800 focus:border-blue-500"; 
  const inputContainerStyle = "mb-4";

  // Estilos internos del DropDownPicker (utilizando códigos de color de Tailwind)
  const dropdownBorderColor = '#93C5FD'; // blue-300
  const dropdownStyle = { 
    borderColor: dropdownBorderColor, 
    borderWidth: 2, 
    borderRadius: 8 
  };
  
  const onPetOpen = () => { setOpenPurpose(false); };
  const onPurposeOpen = () => { setOpenPet(false); };

  // Lógica del Selector de Fecha
  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    if (Platform.OS === 'android' && event.type === 'dismissed') {
        setShowDatePicker(false);
        return;
    }
    setShowDatePicker(Platform.OS === 'ios');

    const currentDate = selectedDate || birthDate;
    setBirthDate(currentDate);
    
    const formattedDate = currentDate.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }).replace(/\//g, '-'); 

    setBirthDateDisplay(formattedDate);
    if (Platform.OS !== 'ios') {
        validateBirthDate();
    }
  };

  const showCalendar = () => {
    setShowDatePicker(true);
    setOpenPet(false);
    setOpenPurpose(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* ScrollView (si lo necesitas) iría aquí para manejar el teclado/espacio en formularios largos */}
      <View className="flex-1 p-6"> 
        
        {/* --- TextInputs --- */}
        <View className={inputContainerStyle}>
          <TextInput 
            className={inputStyle} 
            placeholder="Usuario" 
            placeholderTextColor="#6B7280"
            value={username} 
            onChangeText={setUsername} 
            onBlur={() => validateField('username', username)}
          />
          <ErrorText message={errors.username} />
        </View>

        <View className={inputContainerStyle}>
          <TextInput 
            className={inputStyle} 
            placeholder="Email" 
            placeholderTextColor="#6B7280" 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
            onBlur={() => validateField('email', email)}
          />
          <ErrorText message={errors.email} />
        </View>
        
        <View className={inputContainerStyle}>
          <TextInput 
            className={inputStyle} 
            placeholder="Nombre Completo" 
            placeholderTextColor="#6B7280" 
            value={fullName} 
            onChangeText={setFullName} 
            onBlur={() => validateField('fullName', fullName)}
          />
          <ErrorText message={errors.fullName} />
        </View>
        
        <View className={inputContainerStyle}>
          <TextInput 
            className={inputStyle} 
            placeholder="Contraseña" 
            placeholderTextColor="#6B7280" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
            onBlur={() => validateField('password', password)}
          />
          <ErrorText message={errors.password} />
        </View>
        
        <View className={inputContainerStyle}>
          <TextInput 
            className={inputStyle} 
            placeholder="Oficio" 
            placeholderTextColor="#6B7280" 
            value={occupation} 
            onChangeText={setOccupation} 
            onBlur={() => validateField('occupation', occupation)}
          />
          <ErrorText message={errors.occupation} />
        </View>
        
        {/* --- Campo de Fecha CORREGIDO (Solo TouchableOpacity) --- */}
        <View className={inputContainerStyle}>
          <Text className="text-gray-700 mb-1 ml-1 text-xs">Fecha de Nacimiento</Text>
          <TouchableOpacity 
            // **ESTA LÍNEA APLICA LOS ESTILOS DEL INPUT**
            className={`${inputStyle} flex-row justify-between items-center`}
            onPress={showCalendar}
            onBlur={validateBirthDate} 
          >
            {/* Texto de la Fecha Seleccionada */}
            <Text className={birthDateDisplay === initialDateDisplay ? 'text-gray-500' : 'text-gray-800'}>
              {birthDateDisplay}
            </Text>
            {/* Ícono de Calendario */}
            <MaterialCommunityIcons name="calendar-month-outline" size={24} color="#2563EB" />
          </TouchableOpacity>
          <ErrorText message={errors.birthDate} />
        </View>
        
        {/* El selector de fecha flotante se mantiene condicional */}
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthDate}
            mode="date"
            display="compact"
            onChange={onChangeDate}
          />
        )}
        
        {/* --- Dropdown de Mascota (zIndex más alto) --- */}
        <Text className="text-blue-700 mb-1 ml-1 mt-3 font-semibold">Seleccione Mascota</Text>
        <View style={{ zIndex: 5000, marginBottom: openPet ? 100: 20 }}> 
          <DropDownPicker
            open={openPet}
            value={selectedPet}
            items={itemsPet}
            setOpen={setOpenPet}
            setValue={setSelectedPet}
            setItems={setItemsPet}
            onOpen={onPetOpen}
            placeholder="Selecciona una mascota"
            style={dropdownStyle} 
            dropDownContainerStyle={dropdownStyle}
          />
        </View>

        {/* --- Dropdown de Fines (zIndex ligeramente más bajo) --- */}
        <Text className="text-blue-700 mb-1 ml-1 font-semibold">Fines para usar la app</Text>
        <View style={{ zIndex: 4000, marginBottom: openPurpose ? 120 : 20 }}>
          <DropDownPicker
            open={openPurpose}
            value={selectedPurpose}
            items={itemsPurpose}
            setOpen={setOpenPurpose}
            setValue={setSelectedPurpose}
            setItems={setItemsPurpose}
            onOpen={onPurposeOpen}
            placeholder="Selecciona un fin"
            style={dropdownStyle} 
            dropDownContainerStyle={dropdownStyle}
          />
        </View>

        {/* Botón de Registro */}
        <TouchableOpacity 
          className="bg-blue-600 rounded-lg p-4 w-full items-center mt-4 shadow-md"
          onPress={handleRegister}
        >
          <Text className="text-white font-bold text-base">Registrarse</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}