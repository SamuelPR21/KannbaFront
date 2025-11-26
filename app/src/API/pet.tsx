import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PET } from "../utils/constans.jsx";


export const getPet = async (): Promise<any[] | null> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo null");
            return null;
        }
        const response = await axios.get(`${PET}/state`, {
            headers: { 'Authorization': `${token}` }
        });
        console.log("📌 Mascotas del usuario:", response.data);
        return response.data;
    }
    catch (error: any) {
        console.log("❌ Error al obtener mascotas del usuario:", error.response?.data || error.message);
        return null;
    }
}

export const alimentar = async () : Promise<boolean> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo false");
            return false;
        }
        const response = await axios.post(`${PET}/feed`, {}, {
            headers: { 'Authorization': `${token}` }
        });
        console.log("✅ Mascota alimentada:", response.data);
        return true;
    }
    catch (error: any) {
        const server = error.response?.data;
        const msg = server?.message || server || error.message || "Error desconocido";
        console.log("❌ Error al alimentar la mascota:", msg);
        // Propagar el error para que el caller pueda mostrar la alerta
        throw new Error(msg);
    }
}