import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// Componente auxiliar para mostrar errores
const ErrorText = ({ message }: { message?: string }) => 
  message ? <Text className="text-red-600 text-xs mb-2 ml-1">{message}</Text> : null;

export default function RegisterScreen() {
  const navigation = useNavigation<any>(); // 👈 FIX: tipado genérico para evitar el error TS2345

  // ESTADOS DEL FORMULARIO
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');

  // ESTADOS DEL SELECTOR DE FECHA
  const [birthDate, setBirthDate] = useState(new Date());
  const [birthDateDisplay, setBirthDateDisplay] = useState('YYYY-MM-DD');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // ERRORES
  const [errors, setErrors] = useState<Record<string, string>>({});4

  // DROPDOWNS
  const [openPet, setOpenPet] = useState(false);
  const [selectedPet, setSelectedPet] = useState('gato');
  const [itemsPet, setItemsPet] = useState([
    { label: 'Gato', value: 'gato' },
    { label: 'Perro', value: 'perro' },
  ]);

  const [openPurpose, setOpenPurpose] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('estudio');
  const [itemsPurpose, setItemsPurpose] = useState([
    { label: 'Estudio', value: 'estudio' },
    { label: 'Trabajo', value: 'trabajo' },
    { label: 'Personal', value: 'personal' },
  ]);

  // VALIDACIONES
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  const validateField = (name: string, value: string) => {
    let error = '';

    if (!value.trim()) {
      error = 'Este campo es obligatorio.';
    } else {
      if (name === 'email' && !emailRegex.test(value)) error = 'Formato de correo inválido.';
      if (name === 'fullName' && !nameRegex.test(value)) error = 'Solo se permiten letras y espacios.';
      if (name === 'password' && value.length < 6) error = 'Mínimo 6 caracteres.';
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateBirthDate = () => {
    const error = birthDateDisplay === 'YYYY-MM-DD' ? 'Debe seleccionar su fecha de nacimiento.' : '';
    setErrors(prev => ({ ...prev, birthDate: error }));
    return !error;
  };

  const validateAllFields = () => {
    const values: Record<string, string> = {
      username,
      email,
      fullName,
      password,
      occupation,
    };
  
    const areFieldsValid = Object.entries(values).every(([field, value]) =>
      validateField(field, value)
    );
  
    return areFieldsValid && validateBirthDate();
  };
  

  // REGISTRO
  const handleRegister = () => {
    if (!validateAllFields()) {
      Alert.alert("Error de Formulario", "Por favor, corrija los errores y complete todos los campos.");
      return;
    }

    const formattedBirthDate = birthDate.toISOString().substring(0, 10);
    console.log('Registering user with:', { username, email, fullName, password, occupation, formattedBirthDate, selectedPet, selectedPurpose });

    Alert.alert(
      "Registro Exitoso",
      "Tu cuenta ha sido creada correctamente.",
      [
        { 
          text: "OK", 
          onPress: () => navigation.navigate('Login', { registered: true }) // ✅ CORREGIDO
        }
      ]
    );
  };

  // ESTILOS
  const inputStyle = "border-2 border-blue-300 rounded-lg p-3 w-full text-base text-gray-800 focus:border-blue-500";
  const inputContainerStyle = "mb-4";
  const dropdownStyle = { borderColor: '#93C5FD', borderWidth: 2, borderRadius: 8 };

  const onChangeDate = (event: any, selectedDate?: Date) => {
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
    if (Platform.OS !== 'ios') validateBirthDate();
  };

  const showCalendar = () => {
    setShowDatePicker(true);
    setOpenPet(false);
    setOpenPurpose(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center p-6 bg-white">
        <View className="w-full max-w-md">
          
          {/* Inputs */}
          {[
            { placeholder: "Usuario", value: username, setter: setUsername, name: "username" },
            { placeholder: "Email", value: email, setter: setEmail, name: "email", keyboardType: "email-address" },
            { placeholder: "Nombre Completo", value: fullName, setter: setFullName, name: "fullName" },
            { placeholder: "Contraseña", value: password, setter: setPassword, name: "password", secure: true },
            { placeholder: "Oficio", value: occupation, setter: setOccupation, name: "occupation" },
          ].map(({ placeholder, value, setter, name, keyboardType, secure }) => (
            <View key={name} className={inputContainerStyle}>
              <TextInput
                className={inputStyle}
                placeholder={placeholder}
                placeholderTextColor="#6B7280"
                value={value}
                onChangeText={setter}
                keyboardType={keyboardType as any}
                secureTextEntry={secure}
                onBlur={() => validateField(name, value)}
              />
              <ErrorText message={errors[name]} />
            </View>
          ))}

          {/* Fecha */}
          <View className={inputContainerStyle}>
            <Text className="text-gray-700 mb-1 ml-1 text-xs">Fecha de Nacimiento</Text>
            <TouchableOpacity className={`${inputStyle} flex-row justify-between items-center`} onPress={showCalendar}>
              <Text className={birthDateDisplay === 'YYYY-MM-DD' ? 'text-gray-500' : 'text-gray-800'}>
                {birthDateDisplay}
              </Text>
              <MaterialCommunityIcons name="calendar-month-outline" size={24} color="#2563EB" />
            </TouchableOpacity>
            <ErrorText message={errors.birthDate} />
          </View>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={birthDate}
              mode="date"
              display="compact"
              onChange={onChangeDate}
            />
          )}

          {/* Dropdown Mascota */}
          <Text className="text-blue-700 mb-1 ml-1 mt-3 font-semibold">Seleccione Mascota</Text>
          <View style={{ zIndex: 5000, marginBottom: openPet ? 100 : 20 }}>
            <DropDownPicker
              open={openPet}
              value={selectedPet}
              items={itemsPet}
              setOpen={setOpenPet}
              setValue={setSelectedPet}
              setItems={setItemsPet}
              onOpen={() => setOpenPurpose(false)}
              placeholder="Selecciona una mascota"
              style={dropdownStyle}
              dropDownContainerStyle={dropdownStyle}
            />
          </View>

          {/* Dropdown Fines */}
          <Text className="text-blue-700 mb-1 ml-1 font-semibold">Fines para usar la app</Text>
          <View style={{ zIndex: 4000, marginBottom: openPurpose ? 120 : 20 }}>
            <DropDownPicker
              open={openPurpose}
              value={selectedPurpose}
              items={itemsPurpose}
              setOpen={setOpenPurpose}
              setValue={setSelectedPurpose}
              setItems={setItemsPurpose}
              onOpen={() => setOpenPet(false)}
              placeholder="Selecciona un fin"
              style={dropdownStyle}
              dropDownContainerStyle={dropdownStyle}
            />
          </View>

          {/* Botón */}
          <TouchableOpacity className="bg-blue-600 rounded-lg p-4 w-full items-center mt-4 shadow-md" onPress={handleRegister}>
            <Text className="text-white font-bold text-base">Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}   
