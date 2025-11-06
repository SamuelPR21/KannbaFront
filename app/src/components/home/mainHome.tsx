import { useState } from "react";
import { ScrollView, View } from "react-native";
import OrganizarSelector from "./components/organizarSelector";
import HomeProyecto from "./components/Proyecto/homeProyecto";
import HomeTablero from "./components/Tablero/homeTablero";
import TituloApp from "./components/tituloApp";



export default function HomeMain()  {
    const [organizarPor, setOrganizarPor] = useState<"Tablero" | "Proyecto">("Tablero");
  
    return (
      <ScrollView className="flex-1 bg-blue-50 pt-14 px-4 pb-16">
        <TituloApp title="MIAU" />
  
        <OrganizarSelector
          organizarPor={organizarPor}
          opciones={["Tablero", "Proyecto"]}
          onSelect={(value) => setOrganizarPor(value as "Tablero" | "Proyecto")}
        />
  
        <View className="mt-4">
          {organizarPor === "Tablero" ? <HomeTablero /> : <HomeProyecto />}
        </View>
      </ScrollView>
    );
}
