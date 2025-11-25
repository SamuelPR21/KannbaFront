import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { USER_PROJECTS } from "../utils/constans";

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