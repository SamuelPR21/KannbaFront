import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";
import { getToken, login } from "../API/user";

interface AuthContextType {
    auth: any;
    login: (credentials: any) => Promise<void>;
    logout: () => Promise<void> | void;
}

export const AuthContext = createContext<AuthContextType>({
    auth: null,
    login: async () => {},
    logout: async () => {}
});

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [auth, setAuth] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async() => {
            const token = await getToken();
            if (token) {
                try{
                    const decoded: any = jwtDecode(token);
                    if (!decoded || (decoded.exp && decoded.exp * 1000 <= Date.now())) {
                        await AsyncStorage.removeItem("token");
                    } else {
                        setAuth({ token, user: decoded });
                    }
                }catch (error) {
                    console.error("Token invalid ", error);
                    await AsyncStorage.removeItem("token");
                }
            }
            setLoading(false);
        })();
    }, []);

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        setAuth(null);
    };

    const doLogin = async (credentials: any) => {
        let token: string | null = null;
        try {
            token = await login(credentials.email, credentials.password);
            const decoded: any = jwtDecode(token!);
            await AsyncStorage.setItem("token", token!);
            setAuth({ token, user: decoded });
            console.log("Usuario logueado:", decoded);
        } catch (error: any) {
            Alert.alert("Login error", "Credenciales inválidas. Por favor, inténtalo de nuevo.");
            throw error;
        }
      
    };

    return (
        <AuthContext.Provider value={{ auth, login: doLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};