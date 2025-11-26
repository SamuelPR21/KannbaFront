import { useEffect, useRef, useState } from 'react';
import { alimentar, getPet } from '../../../API/pet';
import { PetState } from '../types';

export function usePet() {
  const [petState, setPetState] = useState<PetState>('HUNGRY');
  const [feedCountToday, setFeedCountToday] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [loading, setLoading] = useState(true);

  // Polling configuration (ms)
  const POLL_INTERVAL_MS = 5000;
  const mountedRef = useRef(true);

  // Load pet from backend and update local state. If `initial` is true, manage loading flag.
  const loadPet = async (initial = false) => {
    try {
      if (initial) setLoading(true);
      const data = await getPet();
      const pet = Array.isArray(data) ? data[0] : data;
      if (!pet) return;

      // Normalize backend states (may come in Spanish) to frontend PetState values
      const rawState = String(pet.state ?? '').toUpperCase();
      const stateMap: Record<string, PetState> = {
        HAMBRIENTO: 'HUNGRY',
        HUNGRY: 'HUNGRY',
        FELIZ: 'HAPPY',
        HAPPY: 'HAPPY',
        MUERTO: 'DEAD',
        DEAD: 'DEAD',
      };
      const mappedState = stateMap[rawState] ?? 'HUNGRY';

      // Only update state if component still mounted
      if (!mountedRef.current) return;
      setPetState(mappedState);
      setCompletedTasks(pet.doneCount ?? 0);
      setFeedCountToday(pet.fedCount ?? 0);
    } catch (err) {
      console.error('Error loading pet from backend:', err);
    } finally {
      if (initial && mountedRef.current) setLoading(false);
    }
  };

  // Start initial load and polling
  useEffect(() => {
    mountedRef.current = true;
    // initial load
    loadPet(true);

    // polling
    const interval = setInterval(() => {
      loadPet(false);
    }, POLL_INTERVAL_MS);

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  // Alimentar mascota
  const feed = async () => {
    try {
      const success = await alimentar();
      if (success) {
        // After successful feed, optimistically update, then fetch latest from server
        setFeedCountToday(prev => prev + 1);
        setPetState('HAPPY');
        // refresh from server to get authoritative counts/state
        loadPet(false);
      }
    } catch (err) {
      console.error('Error feeding pet:', err);
      const message = err instanceof Error ? err.message : String(err);
      const alertMsg = message || 'No se pudo alimentar la mascota.';

      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { Alert } = require('react-native');
        Alert.alert('No se pudo alimentar', alertMsg);
      } catch (e) {
        // Fallback a console si Alert no está disponible
        console.warn('Alert falló:', e, 'message:', alertMsg);
      }
    }
  };

  // Completar tarea (solo local, luego sincronizar con backend si quieres)
  const completeTask = () => {
    setCompletedTasks(prev => prev + 1);
  };

  // Reset diario (opcional, según cron o lógica del backend)
  const resetDay = () => {
    setCompletedTasks(0);
    setFeedCountToday(0);
    setPetState('HUNGRY');
  };

  // Forzar estado manualmente
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
    loading,
  };
}
