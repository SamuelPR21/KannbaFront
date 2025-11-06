import { useEffect, useMemo, useState } from "react";

interface Tarea {
  id?: number;
  nombre: string;
  prioridad: string;
  proyecto: string;
  estado: string;
}

export default function useTareas(estado: string, prioridad: string) {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  // En el futuro, aquí conectarás con tu API REST
  useEffect(() => {
    // Simulación temporal de datos
    const mockTareas: Tarea[] = [
      { nombre: "Tarea 1", prioridad: "Media", proyecto: "Proyecto 1", estado: "To Do" },
      { nombre: "Tarea 2", prioridad: "Baja", proyecto: "Proyecto 2", estado: "Doing" },
      { nombre: "Tarea 3", prioridad: "Alta", proyecto: "Proyecto 3", estado: "To Do" },
      { nombre: "Tarea 4", prioridad: "Alta", proyecto: "Proyecto 4", estado: "Done" },
    ];
    setTareas(mockTareas);
  }, []);

  const tareasFiltradas = useMemo(
    () => tareas.filter((t) => t.estado === estado && t.prioridad === prioridad),
    [tareas, estado, prioridad]
  );

  return { tareasFiltradas };
}
