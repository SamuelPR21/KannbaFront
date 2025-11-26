// src/API/task_personal.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TASKS_PERSONAL } from "../utils/constans";

// LISTA
export const getTaskes = async (): Promise<any[] | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("❌ No hay token, devolviendo null");
      return null;
    }
    const response = await axios.get(`${TASKS_PERSONAL}/my-tasks`, {
      headers: { Authorization: `${token}` },
    });
    console.log("📌 Tareas personales del usuario:", response.data);
    return response.data.tasks;
  } catch (error: any) {
    console.log(
      "❌ Error al obtener tareas personales del usuario:",
      error.response?.data || error.message
    );
    return null;
  }
};

// DETALLE
export const getPersonalTaskById = async (
  taskId: number
): Promise<any | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("❌ No hay token, devolviendo null");
      return null;
    }

    const response = await axios.get(`${TASKS_PERSONAL}/${taskId}`, {
      headers: { Authorization: `${token}` },
    });

    console.log("📌 Detalle tarea personal:", response.data);
    return response.data.task;
  } catch (error: any) {
    console.log(
      `❌ Error al obtener detalle de tarea personal ${taskId}:`,
      error.response?.data || error.message
    );
    return null;
  }
};

// ACTUALIZAR (ahora también acepta stateId)
export const updatePersonalTask = async (
  taskId: number,
  payload: { name?: string; description?: string; stateId?: number }
): Promise<any | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("❌ No hay token, devolviendo null");
      return null;
    }

    const response = await axios.put(
      `${TASKS_PERSONAL}/${taskId}`,
      payload,
      {
        headers: { Authorization: `${token}` },
      }
    );

    console.log("📌 Tarea personal actualizada:", response.data);
    return response.data;
  } catch (error: any) {
    console.log(
      `❌ Error al actualizar tarea personal ${taskId}:`,
      error.response?.data || error.message
    );
    return null;
  }
};
