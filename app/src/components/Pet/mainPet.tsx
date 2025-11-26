import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import TituloApp from '../home/components/tituloApp';
import FeedButton from './components/FeedButton';
import PetCanvas from './components/PetCanvas';
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
      <View className="flex-1 items-center justify-start bg-gradient-to-b from-blue-900 via-blue-800 to-sky-700 pt-6 pb-6">
        <View className="w-full px-6 pt-4">
          <TituloApp title="MIAU" />
        </View>

        <View className="w-full px-6 mt-4">
          <PetCanvas state={petState} />
        </View>

        <View className="w-full px-6 mt-4">
          <View className="bg-white/6 rounded-2xl p-4 flex-row justify-between items-center shadow-lg border border-white/10">
            <View>
              <Text className="text-black font-bold text-lg">Estado</Text>
              <Text className="text-black/80 mt-1">{petState}</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View className="px-3 py-2 bg-white/8 rounded-xl items-center">
                <Text className="text-black font-semibold">Tareas</Text>
                <Text className="text-black/90 mt-1">{completedTasks}</Text>
              </View>
              <View className="px-3 py-2 bg-white/8 rounded-xl items-center">
                <Text className="text-black font-semibold">Alimentado</Text>
                <Text className="text-black/90 mt-1">{feedCountToday}</Text>
              </View>
            </View>
          </View>

          <View className="mt-4 items-center">
            <FeedButton onPress={handleFeed} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
