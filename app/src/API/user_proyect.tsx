import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { USER_PROJECTS } from "../utils/constans";

export interface ProyectMember {
  userProyectId: number;
  userId: number;
  username: string;
  role: string;
}


export const getUserProjects = async (): Promise<any[] | null> => {   
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo null");   
            return null;
        }        
        const response = await axios.get(`${USER_PROJECTS}/listProyect`, {
            headers: { 'Authorization': `${token}` }
        });
        console.log("📌 Proyectos del usuario:", response.data);
        return response.data;
    } catch (error: any) {
        console.log("❌ Error al obtener proyectos del usuario:", error.response?.data || error.message);
        return null;
    }
};

export const getUserIsNotProject = async (projectId: number | string): Promise<any[] | null> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo null");   
            return null;
        }
        const response = await axios.get(`${USER_PROJECTS}/userNot/${projectId}`, {
            headers: { 'Authorization': `${token}` }
        });
        console.log("📌 Usuarios no en el proyecto:", response.data);
        return response.data;
    } catch (error: any) {
        console.log("❌ Error al obtener usuarios no en el proyecto:", error.response?.data || error.message);
        return null;
    }
}

// Lista de miembros de un proyecto (para que el manager elija responsable)
export const getProyectMembers = async (
  proyectId: number
): Promise<ProyectMember[] | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("❌ No hay token, devolviendo null");
      return null;
    }

    const response = await axios.get(
      `${USER_PROJECTS}/listUser/${proyectId}`,
      {
        headers: { Authorization: `${token}` },
      }
    );

    console.log(`📌 Miembros del proyecto ${proyectId}:`, response.data);

    const raw = Array.isArray(response.data) ? response.data : [];

    const mapped: ProyectMember[] = raw.map((m: any) => ({
      userProyectId: m.userProyectId,
      userId: m.userId,
      username: m.userName,
      email: m.email,
      role: m.role,
    }));

    return mapped;
  } catch (error: any) {
    console.log(
      `❌ Error al obtener miembros del proyecto ${proyectId}:`,
      error.response?.data || error.message
    );
    return null;
  }
};
export const addUserToProject = async (proyectId: number | string, userId: string | number, roleId: number | string): Promise<boolean> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo false");   
            return false;
        }
        const response = await axios.post(`${USER_PROJECTS}`, {
            proyectId: proyectId,
            userId: userId,
            roleId: roleId
        }, {
            headers: { 'Authorization': `${token}` }
        });
        console.log("✅ Usuario agregado al proyecto:", response.data);
        return true;
    }
    catch (error: any) {
        console.log("❌ Error al agregar usuario al proyecto:", error.response?.data || error.message);
        return false;
    }
}


export const listUsersInProject = async (projectId: number | string): Promise<any[] | null> => {

    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo null");
            return null;
        }
        const response = await axios.get(`${USER_PROJECTS}/listUser/${projectId}`, {
            headers: { 'Authorization': `${token}` }
        });
        console.log("📌 Usuarios en el proyecto:", response.data)
        return response.data
        } catch (error: any) {
            console.log("❌ Error al obtener usuarios en el proyecto:", error.response?.data || error.message);
            return null;    
        }
}


export type RemoveUserResponse = {
  success: boolean;
  message?: string;
};

export const removeUserFromProject = async (
  id: number | string
): Promise<RemoveUserResponse> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      return { success: false, message: "No hay token" };
    }

    const response = await axios.delete(`${USER_PROJECTS}/${id}`, {
      headers: { Authorization: `${token}` },
    });

    console.log("Usuario removido:", response.data);

    return { success: true };
  } catch (error: any) {
    const backendMessage = error.response?.data?.message;

    return {
      success: false,
      message: backendMessage || "Error al remover usuario del proyecto",
    };
  }
};



export const changeUserRoleInProject = async (idUser: number | string, idProyect: number | string, roleId: number | string): Promise<boolean> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo false");
            return false;
        }
        const response = await axios.patch(`${USER_PROJECTS}/${idUser}/${idProyect}`, { roleId }, {
            headers: { 'Authorization': `${token}` }
        });
        console.log("✅ Rol del usuario cambiado en el proyecto:", response.data);
        return true;
    } catch (error: any) {
        console.log("❌ Error al cambiar rol del usuario en el proyecto:", error.response?.data || error.message);
        return false;
    }
}
