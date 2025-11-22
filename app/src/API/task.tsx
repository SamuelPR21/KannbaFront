import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TASKS_PERSONAL } from "../utils/constans";

export const getTaskes = async (): Promise<any[] | null> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo null");
            return null;
        }
        const response = await axios.get(`${TASKS_PERSONAL}/my-tasks`, {
            headers: { 'Authorization': `${token}` }
        });
        console.log("📌 Tareas del usuario:", response.data);
        return response.data.tasks;
    } catch (error: any) {
        console.log("❌ Error al obtener tareas del usuario:", error.response?.data || error.message);
        return null;
    }
}
