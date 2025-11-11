import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import FeedButton from './components/FeedButton';
import PetCanvas from './components/PetCanvas';
import StateToggleDebug from './components/StateToggleDebug';
import { usePet } from './hooks/usePet';

export default function MainPet() {
  const {
    petState,
    feedCountToday,
    completedTasks,
    feed,
    completeTask,
    forceSetState,
    loading,
  } = usePet();

  if (loading)
    return <Text className="text-white text-center mt-10">Cargando...</Text>;

  const handleFeed = () => {
    if (completedTasks === 0) {
      Alert.alert('⚠️ No has completado tareas', 'Debes completar al menos una tarea.');
      return;
    }
    feed();
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 items-center justify-center bg-blue-900">
        <PetCanvas state={petState} />

        <Text className="text-white text-lg mt-4 font-bold">
          Estado actual: {petState}
        </Text>
        <Text className="text-blue-200 mt-1">
          Tareas completadas: {completedTasks}
        </Text>
        <Text className="text-blue-200 mt-1">
          Veces alimentado hoy: {feedCountToday}
        </Text>

        <View className="mt-5">
          <FeedButton onPress={handleFeed} disabled={petState === 'DEAD'} />
        </View>

        <View className="mt-3">
          <FeedButton onPress={completeTask}>Completar tarea</FeedButton>
        </View>

        <StateToggleDebug onSet={forceSetState} />
      </View>
    </ScrollView>
  );
}
