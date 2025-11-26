// src/components/home/components/manager/modalchange.tsx
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// APIs
import {
  getProjectTaskDetail,
  updateProjectTask,
} from "../../../../API/task_proyect";

import {
  getPersonalTaskById,
  updatePersonalTask,
} from "../../../../API/task_personal";

import {
  getStates,
  StateItem,
} from "../../../../API/state";

import {
  getProyectMembers,
  ProyectMember,
} from "../../../../API/user_proyect";

import { RootStackParamList } from "../../../../navigation/types";

type ModalChangeRouteProp = RouteProp<RootStackParamList, "ModalChange">;

type Scope = "personal" | "project";

interface TaskEditViewModel {
  id: number;
  scope: Scope;
  proyectId?: number;
  name: string;
  description: string;
  stateKey?: "BACKLOG" | "TO_DO" | "DOING" | "DONE" | null;
  responsibleName?: string;
  responsibleUserProyectId?: number;
}

const ErrorText = ({ message }: { message?: string }) =>
  message ? (
    <Text className="text-red-600 text-xs mb-2 ml-1">{message}</Text>
  ) : null;

function mapStateToLabel(stateName?: string | null): string {
  if (!stateName) return "Sin estado";

  switch (stateName) {
    case "BACKLOG":
      return "Back log";
    case "TO_DO":
      return "To do";
    case "DOING":
      return "Doing";
    case "DONE":
      return "Done";
    default:
      return stateName;
  }
}

export default function ModalChange() {
  const navigation = useNavigation();
  const route = useRoute<ModalChangeRouteProp>();
  const { taskId, scope, proyectId } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [task, setTask] = useState<TaskEditViewModel | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Campos editables
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  // Estados
  const [states, setStates] = useState<StateItem[]>([]);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const [initialStateId, setInitialStateId] = useState<number | null>(null);

  // Miembros del proyecto
  const [members, setMembers] = useState<ProyectMember[]>([]);
  const [selectedUserProyectId, setSelectedUserProyectId] =
    useState<number | null>(null);
  const [initialUserProyectId, setInitialUserProyectId] =
    useState<number | null>(null);

  const inputStyle =
    "border-2 border-blue-300 rounded-lg px-3 py-3 w-full text-base leading-tight text-gray-800 focus:border-blue-500";
  const inputContainerStyle = "mb-4";

  // Cargar estados
  useEffect(() => {
    (async () => {
      try {
        const data = await getStates();
        setStates(data ?? []);
      } catch (err) {
        console.log("❌ Error cargando estados:", err);
        setStates([]);
      }
    })();
  }, []);

  // Cargar detalle de la tarea
  useEffect(() => {
    (async () => {
      if (!taskId || !scope) {
        setLoading(false);
        return;
      }

      try {
        if (scope === "personal") {
          const data = await getPersonalTaskById(taskId);
          if (!data) setTask(null);
          else {
            const rawState = data.state?.name ?? data.stateName ?? null;

            const vm: TaskEditViewModel = {
              id: data.id,
              scope: "personal",
              name: data.name ?? "Tarea sin nombre",
              description: data.description ?? "",
              stateKey: rawState ?? null,
              responsibleName: "Tú",
            };

            setTask(vm);
            setTaskName(vm.name);
            setDescription(vm.description);
          }
        } else {
          const data = await getProjectTaskDetail(proyectId!, taskId);
          if (!data) setTask(null);
          else {
            const rawState = data.state ?? null;

            const vm: TaskEditViewModel = {
              id: data.taskId,
              scope: "project",
              proyectId: data.proyectId,
              name: data.name ?? "Tarea sin nombre",
              description: data.description ?? "",
              stateKey: rawState ?? null,
              responsibleName: data.responsible?.username ?? "Sin asignar",
              responsibleUserProyectId: data.responsible?.userProyectId ?? null,
            };

            setTask(vm);
            setTaskName(vm.name);
            setDescription(vm.description);
          }
        }
      } catch (err) {
        console.log("❌ Error cargando tarea:", err);
        setTask(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [taskId, scope, proyectId]);

  // Seleccionar estado inicial
  useEffect(() => {
    if (!task || states.length === 0) return;

    const raw = task.stateKey;
    const st = states.find((s) => s.name === raw);
    if (st) {
      setSelectedStateId(st.id);
      setInitialStateId(st.id);
    }
  }, [task, states]);

  // Cargar miembros del proyecto
  useEffect(() => {
    if (scope !== "project" || !proyectId) return;

    (async () => {
      try {
        const data = await getProyectMembers(proyectId);
        const list = data ?? [];
        setMembers(list);

        if (task?.responsibleUserProyectId) {
          const current = list.find(
            (m) => m.userProyectId === task.responsibleUserProyectId
          );
          if (current) {
            setSelectedUserProyectId(current.userProyectId);
            setInitialUserProyectId(current.userProyectId);
          }
        }
      } catch (err) {
        console.log("❌ Error cargando miembros:", err);
        setMembers([]);
      }
    })();
  }, [scope, proyectId, task]);

  const validateForm = () => {
    const newErrors: any = {};
    let valid = true;

    if (!taskName.trim()) {
      newErrors.taskName = "El nombre es obligatorio.";
      valid = false;
    }
    if (!description.trim()) {
      newErrors.description = "La descripción es obligatoria.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!task) return;
    if (!validateForm()) {
      Alert.alert("Error", "Completa los campos obligatorios.");
      return;
    }

    try {
      setSaving(true);

      const payload: any = {
        name: taskName.trim(),
        description: description.trim(),
      };

      // Estado
      if (selectedStateId !== initialStateId) {
        payload.stateId = selectedStateId;
      }

      // Responsable (solo proyecto)
      if (
        task.scope === "project" &&
        selectedUserProyectId !== null &&
        selectedUserProyectId !== initialUserProyectId
      ) {
        payload.userProyectId = selectedUserProyectId;
      }

      const hasChanges =
        payload.name !== task.name ||
        payload.description !== task.description ||
        payload.stateId !== undefined ||
        payload.userProyectId !== undefined;

      if (!hasChanges) {
        Alert.alert("Sin cambios", "No se detectaron modificaciones.");
        setSaving(false);
        return;
      }

      if (task.scope === "personal") {
        await updatePersonalTask(task.id, payload);
      } else {
        await updateProjectTask(task.proyectId!, task.id, payload);
      }

      Alert.alert("Éxito", "La tarea se actualizó correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.log("❌ Error al guardar:", err);
      Alert.alert("Error", "No fue posible guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  const handleGoBack = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-gray-100 justify-center items-center p-6">
        <View className="w-full bg-white rounded-xl p-6 shadow-2xl">

          <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Editar Tarea
          </Text>

          {loading ? (
            <View className="items-center mt-4">
              <ActivityIndicator size="large" />
              <Text className="mt-2 text-sm text-blue-500">
                Cargando datos...
              </Text>
            </View>
          ) : !task ? (
            <Text className="text-center text-red-500 mb-4">
              No se pudo cargar la información.
            </Text>
          ) : (
            <>
              {/* Nombre */}
              <Text className="text-blue-700 mb-1 ml-1 font-semibold">
                Nombre
              </Text>
              <View className={inputContainerStyle}>
                <TextInput
                  className={inputStyle}
                  value={taskName}
                  onChangeText={setTaskName}
                  placeholder="Nombre de la tarea"
                  onBlur={validateForm}
                />
                <ErrorText message={errors.taskName} />
              </View>

              {/* Descripción */}
              <Text className="text-blue-700 mb-1 ml-1 font-semibold">
                Descripción
              </Text>
              <View className={inputContainerStyle}>
                <TextInput
                  className={inputStyle}
                  value={description}
                  onChangeText={setDescription}
                  onBlur={validateForm}
                  multiline
                  numberOfLines={4}
                  style={{ minHeight: 80, textAlignVertical: "top" }}
                />
                <ErrorText message={errors.description} />
              </View>

              {/* Responsable */}
              <Text className="text-blue-700 mb-1 ml-1 font-semibold">
                Responsable actual
              </Text>
              <View className="mb-2 border-b border-blue-300 pb-2">
                <Text className="text-gray-800 text-base">
                  {task.responsibleName ?? "Sin asignar"}
                </Text>
              </View>

              {/* Cambiar responsable (solo proyecto) */}
              {task.scope === "project" && (
                <>
                  <Text className="text-blue-700 mb-1 ml-1 font-semibold">
                    Cambiar responsable
                  </Text>

                  {members.length === 0 ? (
                    <Text className="text-gray-500 text-sm mb-4">
                      No se pudieron cargar los integrantes.
                    </Text>
                  ) : (
                    <View className="flex-row flex-wrap gap-2 mb-4 mt-2">
                      {members.map((m) => {
                        const isActive =
                          selectedUserProyectId === m.userProyectId;

                        return (
                          <TouchableOpacity
                            key={m.userProyectId}
                            onPress={() =>
                              setSelectedUserProyectId(m.userProyectId)
                            }
                            className={`px-3 py-2 rounded-full border ${
                              isActive
                                ? "bg-emerald-600 border-emerald-600"
                                : "bg-white border-emerald-300"
                            }`}
                          >
                            <Text
                              className={`text-sm ${
                                isActive ? "text-white" : "text-emerald-800"
                              }`}
                            >
                              {m.username} · {m.role}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </>
              )}

              {/* Estado */}
              <Text className="text-blue-700 mb-1 ml-1 font-semibold">
                Estado
              </Text>
              <View className="flex-row flex-wrap gap-2 mb-4 mt-2">
                {states.map((st) => {
                  const isActive = selectedStateId === st.id;
                  return (
                    <TouchableOpacity
                      key={st.id}
                      onPress={() => setSelectedStateId(st.id)}
                      className={`px-3 py-2 rounded-full border ${
                        isActive
                          ? "bg-blue-600 border-blue-600"
                          : "bg-white border-blue-300"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          isActive ? "text-white" : "text-blue-700"
                        }`}
                      >
                        {mapStateToLabel(st.name)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Botones */}
              <View className="flex-row justify-between mt-4">
                <TouchableOpacity
                  className="flex-1 bg-black rounded-lg p-3 items-center mr-2"
                  onPress={handleGoBack}
                  disabled={saving}
                >
                  <Text className="text-white font-semibold">Atrás</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 bg-blue-600 rounded-lg p-3 items-center ml-2"
                  onPress={handleSubmit}
                  disabled={saving}
                >
                  <Text className="text-white font-semibold">
                    {saving ? "Guardando..." : "Guardar Cambios"}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
