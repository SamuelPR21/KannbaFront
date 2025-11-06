import { ScrollView, View } from "react-native";
import useTareasProyecto from "../../hooks/useTareasProyecto";
import TablaProyecto from "./tablaProyecto";
import TablaSinProyecto from "./tablaSinProyecto";

export default function HomeProyecto() {
  const { tareasConProyecto, tareasSinProyecto } = useTareasProyecto();

  return (
    <ScrollView className="flex-1 bg-blue-50 pt-14 px-4 pb-16">
      <View className="mt-4">
        <TablaProyecto titulo="Proyecto A" tareas={tareasConProyecto} />
      </View>

      <View className="mt-4">
        <TablaSinProyecto tareas={tareasSinProyecto} />
      </View>

    </ScrollView>
  );
}
