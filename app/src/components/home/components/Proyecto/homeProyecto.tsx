// src/components/home/components/Proyecto/homeProyecto.tsx
import {
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { getTasksByProject } from "../../../../API/task_proyect";
import useAuth from "../../../../hook/useAuth"; // 👈 NUEVO
import { RootStackParamList } from "../../../../navigation/types";
import useProyectosUsuario, {
  ProyectoUsuario,
  TaskPreview,
} from "../../hooks/useProyectosUsuario";

type RootNav = NativeStackNavigationProp<RootStackParamList>;

// Extendemos TaskPreview con más campos
type TareaProyectoPreview = TaskPreview & {
  responsibleName?: string | null;
  stateName?: string | null;
};

type ProyectoAbierto = ProyectoUsuario & {
  accentClassName: string;
  borderClassName: string;
  dotClassName: string;
  tasksPreview?: TareaProyectoPreview[];
};

// Colores por categoría
const CARD_COLORS = [
  {
    accentClassName: "bg-violet-500",
    borderClassName: "border-violet-400",
    dotClassName: "bg-violet-300",
  },
  {
    accentClassName: "bg-amber-400",
    borderClassName: "border-amber-300",
    dotClassName: "bg-amber-300",
  },
  {
    accentClassName: "bg-sky-500",
    borderClassName: "border-sky-400",
    dotClassName: "bg-sky-300",
  },
  {
    accentClassName: "bg-emerald-500",
    borderClassName: "border-emerald-400",
    dotClassName: "bg-emerald-300",
  },
];

// Personal → morado, Trabajo → amarillo, Universidad → azul, StartUp → verde
function getCardColors(categoryName: string | undefined | null, index: number) {
  switch (categoryName) {
    case "Personal":
      return CARD_COLORS[0];
    case "Trabajo":
      return CARD_COLORS[1];
    case "Universidad":
      return CARD_COLORS[2];
    case "StartUp":
      return CARD_COLORS[3];
    default:
      return CARD_COLORS[index % CARD_COLORS.length];
  }
}

export default function HomeProyecto() {
  const navigation = useNavigation<RootNav>();
  const { proyectos, loading } = useProyectosUsuario();
  const { auth } = useAuth(); // 👈 usuario logueado

  const [proyectoAbierto, setProyectoAbierto] =
    useState<ProyectoAbierto | null>(null);

  const abrirProyecto = (p: ProyectoUsuario, index: number) => {
    const colors = getCardColors(p.categoryName, index);
    setProyectoAbierto({
      ...p,
      ...colors,
      tasksPreview: Array.isArray(p.tasksPreview)
        ? (p.tasksPreview as TareaProyectoPreview[])
        : [],
    });
  };

  const cerrarProyecto = () => setProyectoAbierto(null);

  // REFRESH al tener un proyecto abierto
  useFocusEffect(
    useCallback(() => {
      if (!proyectoAbierto) return;

      let isActive = true;

      (async () => {
        const tareas = await getTasksByProject(proyectoAbierto.proyectId);
        if (!isActive || !tareas) return;

        setProyectoAbierto((prev) =>
          prev
            ? {
                ...prev,
                tasksPreview: tareas as TareaProyectoPreview[],
              }
            : prev,
        );
      })();

      return () => {
        isActive = false;
      };
    }, [proyectoAbierto?.proyectId]),
  );

  // Navegar a modal correcto según rol
  const handleTaskPress = (
    task: TareaProyectoPreview,
    proyecto: ProyectoAbierto
  ) => {
    if (proyecto.role === "MANAGER") {
      navigation.navigate("ModalChange", {
        taskId: task.id,
        scope: "project",
        proyectId: proyecto.proyectId,
      });
    } else {
      navigation.navigate("ModalInfo", {
        taskId: task.id,
        scope: "project",
        proyectId: proyecto.proyectId,
        task: {
          id: task.id,
          name: task.name,
          description: task.description ?? null,
          responsibleName: task.responsibleName ?? null,
          stateName: task.stateName ?? null,
        },
      });
    }
  };

  return (
    <>
      {/* LISTA DE PROYECTOS */}
      <ScrollView className="flex-1 bg-blue-50 pt-2 px-1 pb-20">
        {loading ? (
          <Text className="text-center text-blue-500 mt-8">
            Cargando proyectos...
          </Text>
        ) : !proyectos || proyectos.length === 0 ? (
          <Text className="text-center text-blue-500 mt-8">
            No estás asignado a ningún proyecto todavía.
          </Text>
        ) : (
          <View className="flex-row flex-wrap justify-between mt-2">
            {proyectos.map((p, index) => {
              const colors = getCardColors(p.categoryName, index);

              const safeTasksPreview: TareaProyectoPreview[] =
                Array.isArray(p.tasksPreview)
                  ? (p.tasksPreview as TareaProyectoPreview[])
                  : [];
              const tasksCount =
                typeof p.tasksCount === "number"
                  ? p.tasksCount
                  : safeTasksPreview.length;
              const membersCount =
                typeof p.membersCount === "number" ? p.membersCount : 0;

              return (
                <Pressable
                  key={p.proyectId}
                  className="w-[48%] mb-4"
                  onPress={() => abrirProyecto(p, index)}
                >
                  <View
                    className={`rounded-3xl border bg-white overflow-hidden ${colors.borderClassName}`}
                  >
                    {/* Header */}
                <View
                  className={`px-3 pt-2 pb-2 ${colors.accentClassName}`}
                >
                  {/* Contenedor con ALTO FIJO para que todas las cards midan igual */}
                  <View className="min-h-[40px] items-center justify-center px-1">
                    <Text
                      className="text-white font-semibold text-[12px] text-center leading-tight"
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {p.proyectName}
                    </Text>
                  </View>

                  {/* Rol centrado debajo */}
                  <View className="mt-1 bg-white/90 px-2 py-[2px] rounded-full self-center">
                    <Text className="text-[10px] font-semibold text-slate-900 text-center">
                      {p.role?.toUpperCase?.() ?? "SIN ROL"}
                    </Text>
                  </View>
                </View>

                    {/* Cuerpo */}
                    <View className="px-3 pt-3 pb-3 items-center">
                      <Text className="text-[11px] text-slate-500 text-center">
                        Categoría:
                      </Text>
                      <Text className="text-[12px] font-semibold text-slate-800 text-center">
                        {p.categoryName || "Sin categoría"}
                      </Text>

                      <Text className="text-[11px] text-slate-500 mt-2 text-center">
                        Tareas en este proyecto
                      </Text>

                      <View className="flex-row flex-wrap mt-1 mb-2 min-h-[18px] justify-center">
                        {tasksCount === 0 ? (
                          <Text className="text-[11px] text-slate-400 text-center">
                            Sin tareas en este proyecto
                          </Text>
                        ) : (
                          safeTasksPreview.map((t) => (
                            <View
                              key={t.id}
                              className={`w-4 h-4 mr-1 mb-1 rounded-sm ${colors.dotClassName}`}
                            />
                          ))
                        )}
                      </View>

                      <View className="mt-1 items-center">
                        <Text className="text-[11px] text-slate-600 text-center">
                          {tasksCount} {tasksCount === 1 ? "tarea" : "tareas"} ·{" "}
                          {membersCount} {membersCount === 1 ? "integrante" : "integrantes"}
                        </Text>
                      </View>

                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* MODAL: PROYECTO ABIERTO */}
      <Modal
        visible={!!proyectoAbierto}
        animationType="slide"
        onRequestClose={cerrarProyecto}
      >
        <View className="flex-1 bg-blue-50 pt-14 px-4 pb-6">
          {proyectoAbierto && (
            <>
              {/* Header modal */}
              <View className="flex-row items-center mb-4">
                <Pressable
                  onPress={cerrarProyecto}
                  className="mr-3 px-3 py-1 rounded-full bg-slate-200"
                >
                  <Text className="text-slate-700 text-sm">Volver</Text>
                </Pressable>

                <View className="flex-1 items-center">
                  <View
                    className={`rounded-2xl px-4 py-2 ${proyectoAbierto.accentClassName} w-full items-center`}
                  >
                    <Text className="text-base font-bold text-white">
                      {proyectoAbierto.proyectName}
                    </Text>
                  </View>
                  <Text className="mt-1 text-[11px] text-slate-600">
                    Rol: {proyectoAbierto.role}
                  </Text>
                </View>
              </View>

              {/* Info general */}
              <View className="mb-3">
                <Text className="text-[12px] text-slate-700">
                  Categoría:{" "}
                  <Text className="font-semibold">
                    {proyectoAbierto.categoryName || "Sin categoría"}
                  </Text>
                </Text>
                <Text className="text-[12px] text-slate-700 mt-1">
                  Tareas:{" "}
                  <Text className="font-semibold">
                    {proyectoAbierto.tasksCount ?? 0}
                  </Text>{" "}
                  · Integrantes:{" "}
                  <Text className="font-semibold">
                    {proyectoAbierto.membersCount ?? 0}
                  </Text>
                </Text>
              </View>

              {/* Lista de tareas */}
              <ScrollView className="flex-1 mt-2">
                {!proyectoAbierto.tasksPreview ||
                proyectoAbierto.tasksPreview.length === 0 ? (
                  <Text className="text-center text-slate-400 mt-10">
                    Este proyecto no tiene tareas visibles para tu rol.
                  </Text>
                ) : (
                  proyectoAbierto.tasksPreview.map(
                    (t: TareaProyectoPreview) => {
                      const isMine =
                        !!auth?.user?.username &&
                        t.responsibleName === auth.user.username;

                      return (
                        <Pressable
                          key={t.id}
                          onPress={() => handleTaskPress(t, proyectoAbierto)}
                        >
                          <View
                            className={`rounded-xl p-3 mb-3 shadow-sm border ${
                              isMine
                                ? `${proyectoAbierto.borderClassName} bg-blue-50`
                                : "border-slate-100 bg-white"
                            }`}
                          >
                            <Text className="font-semibold text-slate-800">
                              {t.name}
                            </Text>

                            <View className="flex-row justify-between mt-1">
                              <Text className="text-[11px] text-slate-500">
                                {t.responsibleName || "Sin responsable"}
                              </Text>
                              <Text className="text-[11px] font-semibold text-blue-600">
                                {t.stateName || "Sin estado"}
                              </Text>
                            </View>

                            {isMine && (
                              <Text className="text-[10px] text-emerald-700 font-semibold mt-1">
                                Asignada a ti
                              </Text>
                            )}

                            <Text className="text-[11px] text-slate-500 mt-1">
                              {proyectoAbierto.role === "MANAGER"
                                ? "Toca para editar esta tarea"
                                : "Toca para ver la información de esta tarea"}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    },
                  )
                )}
              </ScrollView>
            </>
          )}
        </View>
      </Modal>
    </>
  );
}
