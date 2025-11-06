import { useEffect, useState } from "react";

interface Tarea {
  id?: number;
  nombre: string;
  categoria: string;
  proyecto?: string;
}

export default function useTareasProyecto() {
  const [tareasConProyecto, setTareasConProyecto] = useState<Tarea[]>([]);
  const [tareasSinProyecto, setTareasSinProyecto] = useState<Tarea[]>([]);

  useEffect(() => {
    // En el futuro aquí se hace fetch a tu backend
    const mockConProyecto: Tarea[] = [
      { nombre: "Tarea 1", categoria: "Back log", proyecto: "Proyecto A" },
      { nombre: "Tarea 2", categoria: "Done", proyecto: "Proyecto A" },
    ];

    const mockSinProyecto: Tarea[] = [
      { nombre: "Tarea 3", categoria: "To Do" },
      { nombre: "Tarea 4", categoria: "Doing" },
    ];

    setTareasConProyecto(mockConProyecto);
    setTareasSinProyecto(mockSinProyecto);
  }, []);

  return { tareasConProyecto, tareasSinProyecto };
}
