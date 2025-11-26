// src/API/task.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PROJECTS } from "../utils/constans";

// LISTA POR PROYECTO
export const getTasksByProject = async (
  proyectId: number
): Promise<any[] | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("❌ No hay token, devolviendo null");
      return null;
    }

    const response = await axios.get(`${PROJECTS}/${proyectId}/tasks`, {
      headers: { Authorization: `${token}` },
    });

    const raw = Array.isArray(response.data) ? response.data : [];

    const mapped = raw.map((t: any) => ({
      id: t.taskId,
      name: t.name,
      description: t.description ?? null,
      responsibleName: t.responsible?.username ?? null,
      stateName: t.state ?? null,
    }));

    console.log(
      `📌 Tareas normalizadas del proyecto ${proyectId}:`,
      mapped
    );

    return mapped;
  } catch (error: any) {
    console.log(
      `❌ Error al obtener tareas del proyecto ${proyectId}:`,
      error.response?.data || error.message
    );
    return null;
  }
};

// DETALLE
export const getProjectTaskDetail = async (
  proyectId: number,
  taskId: number
): Promise<any | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("❌ No hay token, devolviendo null");
      return null;
    }

    const response = await axios.get(
      `${PROJECTS}/${proyectId}/tasks/${taskId}`,
      {
        headers: { Authorization: `${token}` },
      }
    );

    console.log(
      `📌 Detalle tarea de proyecto ${taskId} (proyecto ${proyectId}):`,
      response.data
    );
    return response.data;
  } catch (error: any) {
    console.log(
      `❌ Error al obtener detalle de tarea de proyecto ${taskId}:`,
      error.response?.data || error.message
    );
    return null;
  }
};

// ACTUALIZAR (name / description / stateId / userProyectId)
export const updateProjectTask = async (
  proyectId: number,
  taskId: number,
  payload: {
    name?: string;
    description?: string;
    stateId?: number;
    userProyectId?: number;
  }
): Promise<any | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("❌ No hay token, devolviendo null");
      return null;
    }

    const response = await axios.patch(
      `${PROJECTS}/${proyectId}/tasks/${taskId}`,
      payload,
      {
        headers: { Authorization: `${token}` },
      }
    );

    console.log(
      `📌 Tarea de proyecto ${taskId} actualizada:`,
      response.data
    );
    return response.data;
  } catch (error: any) {
    console.log(
      `❌ Error al actualizar tarea de proyecto ${taskId}:`,
      error.response?.data || error.message
    );
    return null;
  }
};
