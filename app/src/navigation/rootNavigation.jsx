import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../components/welcome/login";
import RegisterScreen from "../components/welcome/register";
import ModalChangeScreen from "../components/home/manager/modalchange";
import ModalInfoScreen from "../components/home/colaborador/modalinfo";
const Stack = createNativeStackNavigator();

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
        </Stack.Navigator>
    );
}