import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TASKS_PERSONAL } from "../utils/constans";

/**
 * GET /task-personal/my-tasks
 * No modificado por petición tuya.
 */
export const getTaskes = async (): Promise<any[] | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("❌ No hay token, devolviendo null");
      return null;
    }
    const response = await axios.get(`${TASKS_PERSONAL}/my-tasks`, {
      headers: { Authorization: `${token}` }
    });
    console.log("📌 Tareas del usuario:", response.data);
    return response.data.tasks ?? response.data ?? null;
  } catch (error: any) {
    console.log("❌ Error al obtener tareas del usuario:", error.response?.data || error.message);
    return null;
  }
};

/**
 * Helper: obtiene headers con Bearer token; acepta token ya con "Bearer " o sin él.
 */
const getAuthHeaders = async (): Promise<Record<string, string> | null> => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.log("❌ No hay token en getAuthHeaders");
    return null;
  }
  const bearer = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  return { Authorization: bearer };
};

/**
 * POST /task-personal
 * Crea nueva tarea. Lanza error en caso de fallo (para que el UI lo capture).
 */
export const createTaskPersonal = async (payload: {
  name: string;
  description?: string;
  userId: number;
  stateId: number;
}): Promise<any> => {
  if (!payload || !payload.name || !payload.userId || !payload.stateId) {
    throw new Error("Payload inválido: name, userId y stateId son requeridos.");
  }

  const headers = await getAuthHeaders();
  if (!headers) throw new Error("No token disponible para crear la tarea.");

  try {
    console.log("DEBUG createTaskPersonal headers and payload:", headers, payload);
    const response = await axios.post(`${TASKS_PERSONAL}`, payload, { headers });
    console.log("✅ Tarea creada:", response.status, response.data);
    // Normalizo posibles shapes de respuesta
    return response.data?.task ?? response.data?.createdTask ?? response.data;
  } catch (error: any) {
    console.log("❌ Error al crear la tarea:", error.response?.data || error.message, "status:", error.response?.status);
    // Rechazo con mensaje legible
    const msg = error.response?.data?.message || error.response?.data || error.message || "Error desconocido";
    throw new Error(msg);
  }
};

/**
 * GET /task-personal/:id
 */
export const getTaskPersonalById = async (id: string | number): Promise<any> => {
  if (!id) throw new Error("Id de la tarea requerido.");
  const headers = await getAuthHeaders();
  if (!headers) throw new Error("No token disponible para obtener detalle de la tarea.");

  try {
    console.log("DEBUG getTaskPersonalById id:", id);
    const response = await axios.get(`${TASKS_PERSONAL}/${id}`, { headers });
    console.log("📌 Detalle tarea:", response.status, response.data);
    return response.data?.task ?? response.data ?? null;
  } catch (error: any) {
    console.log("❌ Error al obtener detalle de la tarea:", error.response?.data || error.message, "status:", error.response?.status);
    const msg = error.response?.data?.message || error.response?.data || error.message || "Error desconocido";
    throw new Error(msg);
  }
};

/**
 * PUT /task-personal/:id
 * Actualiza tarea; retorna la tarea actualizada.
 */
export const updateTaskPersonal = async (
  id: string | number,
  payload: { name?: string; description?: string; stateId?: number }
): Promise<any> => {
  if (!id) throw new Error("Id de la tarea requerido para actualización.");
  const headers = await getAuthHeaders();
  if (!headers) throw new Error("No token disponible para actualizar la tarea.");

  try {
    console.log("DEBUG updateTaskPersonal id:", id, "payload:", payload);
    const response = await axios.put(`${TASKS_PERSONAL}/${id}`, payload, { headers });
    console.log("✅ Tarea actualizada:", response.status, response.data);
    return response.data?.task ?? response.data ?? null;
  } catch (error: any) {
    console.log("❌ Error al actualizar la tarea:", error.response?.data || error.message, "status:", error.response?.status);
    const msg = error.response?.data?.message || error.response?.data || error.message || "Error desconocido";
    throw new Error(msg);
  }
};

/**
 * DELETE /task-personal/:id
 * Elimina tarea por id.
 */
export const deleteTaskPersonal = async (id: string | number): Promise<any> => {
  if (!id) throw new Error("Id de la tarea requerido para eliminar.");
  const headers = await getAuthHeaders();
  if (!headers) throw new Error("No token disponible para eliminar la tarea.");

  try {
    console.log("DEBUG deleteTaskPersonal id:", id);
    const response = await axios.delete(`${TASKS_PERSONAL}/${id}`, { headers });
    console.log("✅ Tarea eliminada:", response.status, response.data);
    // Si respuesta incluye message o task, retornar
    return response.data ?? { message: "Eliminado" };
  } catch (error: any) {
    console.log("❌ Error al eliminar la tarea:", error.response?.data || error.message, "status:", error.response?.status);
    const msg = error.response?.data?.message || error.response?.data || error.message || "Error desconocido";
    throw new Error(msg);
  }
};
