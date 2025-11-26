import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TASKS_PROJECT } from "../utils/constans";

export const getTasksByProject = async (
  proyectId: number
): Promise<any[] | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("❌ No hay token, devolviendo null");
      return null;
    }

    const response = await axios.get(`${TASKS_PROJECT}/${proyectId}/tasks`, {
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
      `${TASKS_PROJECT}/${proyectId}/tasks/${taskId}`,
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


export const createTaskInProject = async (
    proyectId: string | number,
    name: string,
    description: string,
    userProyectId: number | string,
    stateId: number | string,
    ): Promise<boolean> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo false");
            return false;
        }
        const payload = {
            name: name,
            description: description,
            userProyectId: Number(userProyectId),
            stateId: Number(stateId)
        };
        console.log('createTaskInProject -> payload', payload);
        const response = await axios.post(`${TASKS_PROJECT}/${proyectId}/tasks/`, payload, {
            headers: { 'Authorization': `${token}`}
        });
        console.log("✅ Tarea creada en el proyecto:", response.data);
        return true;
    } catch (error) {
        console.error("❌ Error al crear tarea en el proyecto:", error);
        return false;
    }
}

export const listTaskProjectsByState = async( proyectId: string | number, state: string
    ): Promise<any[] | null> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo null");
            return null;
        }
        const response = await axios.get(`${TASKS_PROJECT}/${proyectId}/tasks?state=${state}`, {
            headers: { 'Authorization': `${token}` }
        });
        console.log("📌 Tareas del proyecto por estado:", response.data);
        return response.data;
    } catch (error: any) {
        console.log("❌ Error al obtener tareas del proyecto por estado:", error.response?.data || error.message);
        return null;
    }
}

export const deleteTaskInProject = async (
    proyectId: string | number,
    taskId: string | number
    ): Promise<boolean> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo false");
            return false;
        }
        const response = await axios.delete(`${TASKS_PROJECT}/${proyectId}/tasks/${taskId}`, {
            headers: { 'Authorization': `${token}` }
        });
        console.log("✅ Tarea eliminada del proyecto:", response.data);
        return true;
    } catch (error) {
        console.error("❌ Error al eliminar tarea del proyecto:", error);
        return false;
    }

}


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
      `${TASKS_PROJECT}/${proyectId}/tasks/${taskId}`,
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
