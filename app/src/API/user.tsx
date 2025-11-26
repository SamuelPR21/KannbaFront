import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { USER } from "../utils/constans.jsx";



export const saveToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem("token", token);
    } catch (error) {
        console.log("Error al guardar el token", error);
    }
}

export const getToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem("token");
        return token;
    } catch (error) {
        console.log("Error al obtener el token", error);
        return null;
    }
}



export const login = async (email: string, password: string): Promise<string | null> => {
    try {
        const response = await axios.post(`${USER}/login`, { email, password });
        const token = response.headers['authorization'] ;

        if (!token) {
            console.log("No se recibió token en la respuesta de login");
            return null;
        }

        await saveToken(token);
        return token;
    } catch (error) {
        console.log("Error en login", error);
            throw error;
    }
}


export interface RegisterPayload {
    username: string;
    email: string;
    nameComlpete: string;
    password: string;
    oficio: string;
    dateOfBirth: string;
    purpose: string;
}

export const register = async (payload: RegisterPayload): Promise<any | null> => {
    try {
        const response = await axios.post(`${USER}/register`, payload);
        return response.data;
    } catch (error) {
        console.log("Error en register", error);
        return null;
    }
}


export interface UserProgress {
  state: string;
  totalTasks: number;
  matchingTasks: number;
  progressPercentage: number;
}

export const getProgressByState = async (state: string): Promise<UserProgress | null> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("❌ No hay token, devolviendo null");
            return null;
        }
        const response = await axios.get(`${USER}/progress?state=${state}`, {
            headers: { 'Authorization': `${token}` }
        });
        return response.data;
    } catch (error: any) {
        console.log("❌ Error al obtener progreso por estado:", error.response?.data || error.message);
        return null;
    }
}