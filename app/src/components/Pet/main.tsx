import { Text } from "@react-navigation/elements";
import React from "react";
import { ScrollView } from "react-native";

export default function Main() {

    return (
        <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingTop: 40, paddingBottom: 40 }}
        className="bg-blue-50 px-4"
        >

        <Text className="text-2xl font-bold text-center text-blue-900">
            Componente Principal de Mascotas
        </Text>

        </ScrollView>
)   

}