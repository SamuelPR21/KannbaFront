// src/API/state.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { STATE } from "../utils/constans";

export interface StateItem {
  id: number;
  name: "BACKLOG" | "TO_DO" | "DOING" | "DONE";
}

export const getStates = async (): Promise<StateItem[] | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("❌ No hay token, devolviendo null");
      return null;
    }

    const response = await axios.get(STATE, {
      headers: { Authorization: `${token}` }, // el token ya viene con 'Bearer '
    });

    console.log("📌 Estados:", response.data);
    return response.data.states as StateItem[];
  } catch (error: any) {
    console.log(
      "❌ Error al obtener estados:",
      error.response?.data || error.message
    );
    return null;
  }
};
