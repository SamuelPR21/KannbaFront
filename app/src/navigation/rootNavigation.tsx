import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ModalInfoScreen from "../components/home/components/colaborador/modalinfo";
import ModalChangeScreen from "../components/home/components/manager/modalchange";
import HomeProyecto from "../components/home/components/Proyecto/homeProyecto";
import HomeTablero from "../components/home/components/Tablero/homeTablero";
import LoginScreen from "../components/welcome/login";
import RegisterScreen from "../components/welcome/register";
import Footer from "./footer";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function RootNavigation() {
    return (
        <Stack.Navigator initialRouteName="Login">
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
                name="Tab"
                component={Footer}
                options={{headerShown: false}}
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

        </Stack.Navigator>
    );
}