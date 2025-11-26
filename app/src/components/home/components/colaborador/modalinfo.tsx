// src/components/home/components/colaborador/modalinfo.tsx
import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getProjectTaskDetail } from "../../../../API/task_proyect"; // 👈 NUEVO
import { RootStackParamList } from "../../../../navigation/types";

type ModalInfoRoute = RouteProp<RootStackParamList, "ModalInfo">;
type ModalInfoNav = NativeStackNavigationProp<
  RootStackParamList,
  "ModalInfo"
>;

export default function ModalInfo() {
  const navigation = useNavigation<ModalInfoNav>();
  const route = useRoute<ModalInfoRoute>();

  const params = route.params;
  const task = params?.task;

  // Valores iniciales desde params (por si no hay red, o mientras carga)
  const initialName = task?.name ?? "Tarea sin nombre";
  const initialResponsible = task?.responsibleName ?? "Sin asignar";
  const initialDescription = task?.description ?? "Sin descripción";
  const initialStatus = task?.stateName ?? "Sin estado";

  const [name, setName] = useState(initialName);
  const [responsible, setResponsible] = useState(initialResponsible);
  const [description, setDescription] = useState(initialDescription);
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const labelStyle =
    "text-blue-700 font-semibold mb-1 ml-1";
  const valueStyle =
    "text-gray-800 text-base mb-4 border-b border-blue-300 pb-2";

  // 🔍 Si es tarea de proyecto, traemos detalle real (incluye descripción)
  useEffect(() => {
    const scope = (params as any)?.scope;
    const proyectId = (params as any)?.proyectId;
    const taskId = (params as any)?.taskId;

    if (scope !== "project" || !proyectId || !taskId) return;

    let isActive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getProjectTaskDetail(proyectId, taskId);
        if (!data || !isActive) return;

        setName(data.name ?? initialName);
        setDescription(data.description ?? "Sin descripción");
        setResponsible(
          data.responsible?.username ?? initialResponsible,
        );
        setStatus(data.state ?? initialStatus);
      } catch (err) {
        console.log("❌ Error cargando detalle en ModalInfo:", err);
      } finally {
        if (isActive) setLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [params]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center p-6">
        <View className="w-full bg-white rounded-xl p-6 shadow-2xl max-w-md">
          {/* Título */}
          <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Información de la Tarea
          </Text>

          {loading && (
            <Text className="text-sm text-blue-500 mb-4 text-center">
              Cargando información actualizada...
            </Text>
          )}

          {/* Nombre */}
          <Text className={labelStyle}>Nombre</Text>
          <Text className={valueStyle}>{name}</Text>

          {/* Responsable */}
          <Text className={labelStyle}>Responsable</Text>
          <Text className={valueStyle}>{responsible}</Text>

          {/* Descripción */}
          <Text className={labelStyle}>Descripción</Text>
          <View className="border-b border-blue-300 mb-4 pb-2">
            <Text className="text-gray-800 text-base">
              {description}
            </Text>
          </View>

          {/* Estado */}
          <Text className={labelStyle}>Estado</Text>
          <View className="border-b border-blue-300 mb-6 pb-2">
            <Text className="text-gray-800 text-base font-bold text-blue-600">
              {status}
            </Text>
          </View>

          {/* Botón Cerrar */}
          <TouchableOpacity
            className="bg-black rounded-lg p-3 w-full items-center shadow-md mt-4"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-semibold">
              Cerrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
