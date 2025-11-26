// src/components/home/hooks/useProyectosUsuario.ts
import { useCallback, useEffect, useState } from "react";
import { getUserProjects } from "../../../API/user_proyect";
import useAuth from "../../../hook/useAuth";

export interface TaskPreview {
  id: number;
  name: string;
  description?: string | null;
  responsibleName?: string | null;
  stateName?: string | null;
}

export interface ProyectoUsuario {
  proyectId: number;
  proyectName: string;
  categoryName: string;
  role: string;
  tasksCount?: number;
  membersCount?: number;
  tasksPreview?: TaskPreview[];
}

export default function useProyectosUsuario() {
  const { auth } = useAuth();
  const [proyectos, setProyectos] = useState<ProyectoUsuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refetch = useCallback(async () => {
    if (!auth?.user?.id) {
      setProyectos([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getUserProjects();
      setProyectos((data ?? []) as ProyectoUsuario[]);
    } catch (err) {
      console.log("❌ Error en useProyectosUsuario:", err);
      setProyectos([]);
    } finally {
      setLoading(false);
    }
  }, [auth?.user?.id]);

  useEffect(() => {
    // carga inicial
    refetch();
  }, [refetch]);

  return { proyectos, loading, refetch };
}
