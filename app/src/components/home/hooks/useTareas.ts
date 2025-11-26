// src/components/home/hooks/useTareas.ts
import { useEffect, useMemo, useState } from "react";
import { getTaskes } from "../../../API/task_personal";


// Estados tal como vienen del backend
type EstadoBackend = "BACKLOG" | "TO_DO" | "DOING" | "DONE";

// Forma en que las tareas se usarán en el Home
interface Tarea {
  id: number;
  nombre: string;
  proyecto: string; // por ahora "Personal" (son tareas personales)
  estado: string;   // "Back Log" | "To Do" | "Doing" | "Done"
}

// Lo que devuelve el backend en /task-personal/my-tasks
interface BackendTask {
  id: number;
  name: string;
  description: string;
  userId: number;
  stateId: number;
  stateName: EstadoBackend;
}

// Mapea el enum del backend al texto que usas en las tabs
function mapEstadoToUI(estado: EstadoBackend): string {
  switch (estado) {
    case "BACKLOG":
      return "Back Log";
    case "TO_DO":
      return "To Do";
    case "DOING":
      return "Doing";
    case "DONE":
      return "Done";
    default:
      return estado;
  }
}

/**
 * Hook para obtener y filtrar las tareas personales desde el backend.
 * - estadoUI: "Back Log" | "To Do" | "Doing" | "Done"
 */
export default function useTareas(estadoUI: string) {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    (async () => {
      const backendTasks = await getTaskes();

      if (!backendTasks) {
        setTareas([]);
        return;
      }

      const mapped: Tarea[] = (backendTasks as BackendTask[]).map((t) => ({
        id: t.id,
        nombre: t.name,
        proyecto: "Personal", // por ahora todas son tareas personales
        estado: mapEstadoToUI(t.stateName),
      }));

      setTareas(mapped);
    })();
  }, []);

  const tareasFiltradas = useMemo(
    () => tareas.filter((t) => t.estado === estadoUI),
    [tareas, estadoUI]
  );

  return { tareasFiltradas };
}
