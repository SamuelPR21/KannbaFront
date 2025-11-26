// src/components/home/hooks/useTareasKanban.ts
import { useCallback, useEffect, useState } from "react";
import { getTaskes } from "../../../API/task_personal";


// Estados posibles en el Kanban
export type EstadoKanban = "BACKLOG" | "TO_DO" | "DOING" | "DONE";

// Tarea que se pinta en el tablero
export interface TareaKanban {
  id: number;
  name: string;
  description?: string;
  estado: EstadoKanban;
  tipo: "personal" | "project";
  proyectId?: number;
  proyectoNombre?: string;
}

// Estructura agrupada por estado
export interface TareasPorEstado {
  BACKLOG: TareaKanban[];
  TO_DO: TareaKanban[];
  DOING: TareaKanban[];
  DONE: TareaKanban[];
}

const inicializarTareasPorEstado = (): TareasPorEstado => ({
  BACKLOG: [],
  TO_DO: [],
  DOING: [],
  DONE: [],
});

export default function useTareasKanban() {
  const [tareasPorEstado, setTareasPorEstado] =
    useState<TareasPorEstado>(inicializarTareasPorEstado);
  const [loading, setLoading] = useState<boolean>(true);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getTaskes();
      const tareasPersonalesRaw = Array.isArray(data) ? data : [];

      const tareasPersonales: TareaKanban[] = tareasPersonalesRaw.map(
        (t: any) => {
          const rawState: string =
            t.state ||
            t.stateName ||
            t.estado ||
            t.estado_name ||
            "BACKLOG";

          const upper = String(rawState).toUpperCase();
          let estado: EstadoKanban;

          if (upper.includes("TO_DO") || upper === "TO DO") {
            estado = "TO_DO";
          } else if (upper.includes("DOING")) {
            estado = "DOING";
          } else if (upper.includes("DONE")) {
            estado = "DONE";
          } else {
            estado = "BACKLOG";
          }

          return {
            id: t.id,
            name: t.name,
            description: t.description,
            estado,
            tipo: "personal",
          };
        }
      );

      const agrupadas = inicializarTareasPorEstado();
      for (const tarea of tareasPersonales) {
        agrupadas[tarea.estado].push(tarea);
      }

      setTareasPorEstado(agrupadas);
    } catch (err) {
      console.log("❌ Error en useTareasKanban:", err);
      setTareasPorEstado(inicializarTareasPorEstado());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // carga inicial (por si entras a Home por primera vez)
    refetch();
  }, [refetch]);

  return { tareasPorEstado, loading, refetch };
}
