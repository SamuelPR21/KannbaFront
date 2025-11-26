// src/components/home/components/Tablero/homeTablero.tsx
import {
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { RootStackParamList } from "../../../../navigation/types";
import useTareasKanban, {
  EstadoKanban,
  TareaKanban,
} from "../../hooks/useTareasKanban";
import StateColumn from "./StateColumn";

type RootNav = NativeStackNavigationProp<RootStackParamList>;

interface EstadoConfig {
  key: EstadoKanban;
  title: string;
  accentClassName: string;
  borderClassName: string;
  colorPreview: string;
}

export default function HomeTablero() {
  const { tareasPorEstado, loading, refetch } = useTareasKanban();
  const navigation = useNavigation<RootNav>();

  const [estadoAbierto, setEstadoAbierto] = useState<EstadoConfig | null>(null);

  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  useEffect(() => {
    if (estadoAbierto) {
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);

      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [estadoAbierto, opacityAnim, scaleAnim]);

  const abrirEstado = (config: EstadoConfig) => setEstadoAbierto(config);

  const cerrarEstado = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => setEstadoAbierto(null));
  };

  const handleTaskPress = (task: TareaKanban) => {
    navigation.navigate("ModalChange", {
      taskId: task.id,
      scope: task.tipo === "project" ? "project" : "personal",
      proyectId: task.proyectId,
    });
  };

  return (
    <>
      <ScrollView className="flex-1 bg-blue-50 pt-2 px-1 pb-20">
        {loading ? (
          <View className="mt-6 items-center">
            <ActivityIndicator size="large" />
            <Text className="mt-2 text-sm text-blue-500">
              Cargando tus tareas...
            </Text>
          </View>
        ) : (
          <View className="px-1 mt-2">
            {/* FILA 1 */}
            <View className="flex-row justify-between">
              <StateColumn
                title="BACKLOG"
                accentClassName="bg-sky-500"
                borderClassName="border-sky-400"
                tareas={tareasPorEstado.BACKLOG}
                colorPreview="bg-sky-300"
                onPress={() =>
                  abrirEstado({
                    key: "BACKLOG",
                    title: "BACKLOG",
                    accentClassName: "bg-sky-500",
                    borderClassName: "border-sky-400",
                    colorPreview: "bg-sky-300",
                  })
                }
              />
              <StateColumn
                title="TO DO"
                accentClassName="bg-amber-400"
                borderClassName="border-amber-300"
                tareas={tareasPorEstado.TO_DO}
                colorPreview="bg-amber-300"
                onPress={() =>
                  abrirEstado({
                    key: "TO_DO",
                    title: "TO DO",
                    accentClassName: "bg-amber-400",
                    borderClassName: "border-amber-300",
                    colorPreview: "bg-amber-300",
                  })
                }
              />
            </View>

            {/* FILA 2 */}
            <View className="flex-row justify-between mt-4">
              <StateColumn
                title="DOING"
                accentClassName="bg-violet-500"
                borderClassName="border-violet-400"
                tareas={tareasPorEstado.DOING}
                colorPreview="bg-violet-300"
                onPress={() =>
                  abrirEstado({
                    key: "DOING",
                    title: "DOING",
                    accentClassName: "bg-violet-500",
                    borderClassName: "border-violet-400",
                    colorPreview: "bg-violet-300",
                  })
                }
              />
              <StateColumn
                title="DONE"
                accentClassName="bg-emerald-500"
                borderClassName="border-emerald-400"
                tareas={tareasPorEstado.DONE}
                colorPreview="bg-emerald-300"
                onPress={() =>
                  abrirEstado({
                    key: "DONE",
                    title: "DONE",
                    accentClassName: "bg-emerald-500",
                    borderClassName: "border-emerald-400",
                    colorPreview: "bg-emerald-300",
                  })
                }
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* MODAL DETALLE DE ESTADO */}
      <Modal
        visible={!!estadoAbierto}
        transparent
        animationType="none"
        onRequestClose={cerrarEstado}
      >
        <View className="flex-1 bg-black/40 justify-center items-center">
          <Animated.View
            style={{
              flex: 1,
              width: "92%",
              maxWidth: 420,
              alignSelf: "center",
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            }}
          >
            <View className="flex-1 bg-blue-50 rounded-3xl pt-6 px-4 pb-4 shadow-2xl">
              <View className="flex-row items-center mb-4">
                <Pressable
                  onPress={cerrarEstado}
                  className="mr-3 px-3 py-1 rounded-full bg-slate-200"
                >
                  <Text className="text-slate-700 text-sm">Volver</Text>
                </Pressable>
                {estadoAbierto && (
                  <View className="flex-1 items-center">
                    <View
                      className={`rounded-2xl px-4 py-2 ${estadoAbierto.accentClassName} w-full items-center`}
                    >
                      <Text className="text-base font-bold text-white">
                        {estadoAbierto.title}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {estadoAbierto && (
                <>
                  <Text className="text-xs text-slate-500 mb-3 text-center">
                    Revisa las tareas personales en este estado.
                  </Text>

                  <ScrollView className="flex-1 mt-2">
                    {tareasPorEstado[estadoAbierto.key].length === 0 ? (
                      <Text className="text-center text-slate-400 mt-10">
                        No hay tareas en este estado.
                      </Text>
                    ) : (
                      tareasPorEstado[estadoAbierto.key].map((task) => (
                        <Pressable
                          key={task.id}
                          onPress={() => handleTaskPress(task)}
                        >
                          <View className="bg-white rounded-xl p-3 mb-3 shadow-sm border border-slate-100">
                            <Text className="font-semibold text-slate-800">
                              {task.name}
                            </Text>
                            {task.proyectoNombre && (
                              <Text className="text-[11px] text-slate-500 mt-1">
                                Proyecto: {task.proyectoNombre}
                              </Text>
                            )}
                            <Text className="text-[11px] text-slate-400 mt-1">
                              {task.tipo === "project"
                                ? "Tarea de proyecto"
                                : "Tarea personal"}
                            </Text>
                          </View>
                        </Pressable>
                      ))
                    )}
                  </ScrollView>
                </>
              )}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
