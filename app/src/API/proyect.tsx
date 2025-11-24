import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PROJECTS } from "../utils/constans";


export const createProject = async (data: any): Promise<any | null> => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
        console.log("❌ No hay token, devolviendo null");   
        return null;
    }
    const response = await axios.post(PROJECTS, data, {
      headers: { 'Authorization': `${token}` }
    });
    console.log("📌 Respuesta del backend:", response.data);
    return response.data;
  } catch (error: any) {
    console.log("❌ Error al crear proyecto:", error.response?.data || error.message);
    return null;
  }
};


export const deleteProject = async (projectId: number): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("❌ No hay token, no se puede eliminar el proyecto");
      return false;
    }
    await axios.delete(`${PROJECTS}/${projectId}`, {
      headers: { 'Authorization': `${token}` }
    });
    console.log("✅ Proyecto eliminado correctamente");
    return true;
  } catch (error: any) {
    console.log("❌ Error al eliminar el proyecto:", error.response?.data || error.message);
    return false;
  }
};