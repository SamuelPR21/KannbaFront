import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import ModalInfoScreen from "../components/home/components/colaborador/modalinfo";
import ModalChangeScreen from "../components/home/components/manager/modalchange";
import HomeProyecto from "../components/home/components/Proyecto/homeProyecto";
import HomeTablero from "../components/home/components/Tablero/homeTablero";
import IntoToProyectColaborador from "../components/profile/componets/intoProyect/colaborador";
import IntoToProyectManger from "../components/profile/componets/intoProyect/manager";
import Profile from "../components/profile/profile";
import LoginScreen from "../components/welcome/login";
import RegisterScreen from "../components/welcome/register";
import { AuthContext } from "../context/userContext";
import Footer from "./footer";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function RootNavigation() {

    const { auth } = useContext(AuthContext);
    
    return (
        <Stack.Navigator>
            {
                auth? (
                    <>

                        <Stack.Screen
                            name="Tab"
                            component={Footer}
                            options={{headerShown: false}}
                        />
                        
                        <Stack.Screen 
                            name="ModalChange" 
                            component={ModalChangeScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="ModalInfo" 
                            component={ModalInfoScreen} 
                            options={{ headerShown: false }} 
                        />

                        <Stack.Screen
                            name="HomeProyecto"
                            component={HomeProyecto}
                            options={{headerShown: false}}
                        />

                        <Stack.Screen
                            name="HomeTablero"
                            component={HomeTablero}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="IntoToProyectManger"
                            component={IntoToProyectManger}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="IntoToProyectColaborador"
                            component={IntoToProyectColaborador}
                            options={{headerShown: false}}  
                        />
                        <Stack.Screen
                            name="Profile"
                            component={Profile}
                            options={{headerShown: false}}
                        />
                    </>
                ): (
                    <>
                        <Stack.Screen 
                            name="Login" 
                            component={LoginScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="Register" 
                            component={RegisterScreen} 
                            options={{ headerShown: false }} 
                        />
                    </>
                )
            }

        </Stack.Navigator>
    );
}