import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ROLES } from "../utils/constans";

export const getRoles = async (): Promise<any[] | null> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo null");
            return null;
        }
        const response = await axios.get(`${ROLES}`, {
            headers: { 'Authorization': `${token}` }
        });
        console.log("📌 Roles obtenidos:", response.data);
        return response.data;
    } catch (error: any) {
        console.log("❌ Error al obtener roles:", error.response?.data || error.message);
        return null;
    }
}