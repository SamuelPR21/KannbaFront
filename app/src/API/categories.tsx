import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { CATEGORIES } from "../utils/constans";

export const getCategories = async (): Promise<any[] | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("❌ No hay token, devolviendo []");
      return [];
    }

    const response = await axios.get(CATEGORIES, {
      headers: { 'Authorization': ` ${token}` }
    });

    return response.data;

  } catch (error: any) {
    console.log("❌ Error al obtener categorías:", error.response?.data || error.message);
    return [];
  }
};
