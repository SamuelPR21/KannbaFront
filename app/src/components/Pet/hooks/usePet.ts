import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { PetState } from '../types';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const PET_KEY = 'pet_status';
const TASKS_KEY = 'completed_tasks';

export function usePet() {
  const [petState, setPetState] = useState<PetState>('HUNGRY');
  const [feedCountToday, setFeedCountToday] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [loading, setLoading] = useState(true);

  // Cargar estado al iniciar
  useEffect(() => {
    const load = async () => {
      try {
        const petData = await AsyncStorage.getItem(PET_KEY);
        const taskData = await AsyncStorage.getItem(TASKS_KEY);
        if (petData) setPetState(JSON.parse(petData));
        if (taskData) setCompletedTasks(Number(taskData));
      } catch (err) {
        console.error('Error loading pet data:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Guardar cambios del gato
  useEffect(() => {
    if (!loading) AsyncStorage.setItem(PET_KEY, JSON.stringify(petState));
  }, [petState]);

  // Guardar tareas completadas
  useEffect(() => {
    if (!loading) AsyncStorage.setItem(TASKS_KEY, completedTasks.toString());
  }, [completedTasks]);

  // Cambiar estado del gato según tareas
  useEffect(() => {
    if (completedTasks === 0) setPetState('HUNGRY');
    else if (completedTasks < 5) setPetState('HAPPY');
    else setPetState('DEAD'); // Ejemplo: si no se alimenta en 1 día
  }, [completedTasks]);

  const feed = () => {
    setFeedCountToday(prev => prev + 1);
    setPetState('HAPPY');
  };

  const completeTask = () => {
    setCompletedTasks(prev => prev + 1);
  };

  const resetDay = () => {
    setCompletedTasks(0);
    setFeedCountToday(0);
    setPetState('HUNGRY');
  };

  const forceSetState = (state: PetState) => {
    setPetState(state);
  };

  return {
    petState,
    feedCountToday,
    completedTasks,
    feed,
    completeTask,
    forceSetState,
    resetDay,
    loading
  };
}
