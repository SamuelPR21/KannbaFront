import React, { useContext, useEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { createTaskPersonal, deleteTaskPersonal, getTaskes, updateTaskPersonal } from "../../API/task";
import { AuthContext } from "../../context/userContext";
import useAuth from "../../hook/useAuth";
import LogoutBtn from "./componets/logoutbtn";
import ProgressBar from "./componets/progressbar";
import ProgressStatusSelector from "./componets/progressStatusSelector";
import AddProjectButton from "./componets/Projects/addProjectButton";
import CreateProjectModal from "./componets/Projects/createProjectModalProps";
import ProjectList from "./componets/Projects/projectList";
import ProjectSwitchButtons from "./componets/projectSwitchButtons";
import CreateTaskPersonalbtn from "./componets/taskPersonal/createTaskPersonalbtn";
import ModalTaskPersonal from "./componets/taskPersonal/modalTaskPersonal";
import PersonalProjectList from "./componets/taskPersonal/personalProjectList";
import UserInfo from "./componets/userInfo";
import { StatusKey } from "./types";


export default function Profile() {

  const {logout} = useContext(AuthContext);
  const { auth } = useAuth();
  // Para depuración: ver estructura del payload del JWT
  console.log('Auth context in Profile ->', auth);
  
  const [selectedStatus, setSelectedStatus] = React.useState<StatusKey>("backlog");
  const [selectedList, setSelectedList] = React.useState<"projects" | "personal">("projects");
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [projectsRefresh, setProjectsRefresh] = React.useState(0);
  const [personalTasks, setPersonalTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingTasksFlag, setLoadingTasksFlag] = useState(0);

  // Map stateId <-> estado string
  const stateIdToName = (id?: number) => {
    const map: Record<number, string> = {
      1: "Back Log",
      2: "To Do",
      3: "Doing",
      4: "Done",
    };
    return id ? map[id] ?? "Back Log" : "Back Log";
  };

  const stateNameToId = (name?: string) => {
    const map: Record<string, number> = {
      "Back Log": 1,
      "To Do": 2,
      Doing: 3,
      Done: 4,
    };
    return name ? map[name] ?? 1 : 1;
  };

  const mapApiTaskToUi = (t: any) => ({
    id: String(t.id),
    nombre: t.name,
    descripcion: t.description ?? "",
    estado: stateIdToName(t.stateId),
    stateId: t.stateId,
    userId: t.userId,
  });

  const mapUiToApi = (t: any) => ({
    name: t.nombre ?? t.name,
    description: t.descripcion ?? t.description,
    stateId: stateNameToId(t.estado ?? t.stateName),
  });

  // Load tasks when component mounts or when refresh flag changes
  useEffect(() => {
    const loadPersonalTasks = async () => {
      try {
        const data = await getTaskes();
        console.log("DEBUG tasks raw:", data);
        setPersonalTasks((data ?? []).map(mapApiTaskToUi));
      } catch (error) {
        console.error("Error loading personal tasks:", error);
      }
    };
    loadPersonalTasks();
  }, [auth, projectsRefresh, loadingTasksFlag]);

  const handleStatusChange = (status: StatusKey) => {
    setSelectedStatus(status);
  }

  const handleListChange = (list: "projects" | "personal") => {
    setSelectedList(list)
  }

  const handleLogout = async() => {
    await logout();
  }

  const handleCreateProject = (projectName: string, category: string) => {
    console.log("Nuevo proyecto creado:", projectName, "Categoría:", category);
    setShowCreateModal(false);
    // Incrementar flag para forzar recarga de la lista de proyectos
    setProjectsRefresh((v) => v + 1);
    // Aquí puedes enviar los datos a tu API
  };
  
  const handleItemPress = (tarea: any) => {
    setSelectedTask(tarea);
    setModalVisible(true);
  };

  const handleCreatePersonalTask = async (payload: { nombre: string; descripcion?: string; estado: string }) => {
    try {
      if (!auth?.user?.id) throw new Error("No user id");
      const apiPayload = {
        name: payload.nombre,
        description: payload.descripcion,
        userId: Number(auth.user.id),
        stateId: stateNameToId(payload.estado),
      };
      const created = await createTaskPersonal(apiPayload);
      if (created) {
        setPersonalTasks((prev) => [...prev, mapApiTaskToUi(created)]);
      } else {
        Alert.alert("Error", "No se recibió la tarea creada.");
      }
    } catch (err) {
      console.error("Create task failed:", err);
      Alert.alert("Error", "No se pudo crear la tarea.");
    }
  };

  const handleUpdateTask = async (updatedTask: any) => {
    try {
      const apiPayload = mapUiToApi(updatedTask);
      const updatedApiTask = await updateTaskPersonal(String(updatedTask.id), apiPayload);
      if (updatedApiTask) {
        setPersonalTasks((prev) =>
          prev.map((t) => (String(t.id) === String(updatedApiTask.id) ? mapApiTaskToUi(updatedApiTask) : t))
        );
      }
    } catch (error) {
      console.error("Update task failed:", error);
      Alert.alert("Error", "No se pudo actualizar la tarea.");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    Alert.alert("Eliminar tarea", "¿Seguro que deseas eliminarla?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await deleteTaskPersonal(String(taskId));
            setPersonalTasks((prev) => prev.filter((t) => String(t.id) !== String(taskId)));
            setModalVisible(false);
          } catch (error) {
            console.error("Delete task failed:", error);
            Alert.alert("Error", "No se pudo eliminar la tarea.");
          }
        },
      },
    ]);
  };

  const progressByStatus: Record<StatusKey, number> = {
    backlog: 18,
    todo: 34,
    doing: 62,
    done: 46,
  };

  let today = new Date();
  let birthDate = new Date(auth?.user?.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-16 px-4">
      <UserInfo
        fullName={
          auth?.user?.nameComplete ?? auth?.user?.nameComlpete ?? auth?.user?.name ?? ''
        }
        username={
          auth?.user?.username ?? auth?.user?.usernam ?? auth?.user?.userName ?? ''
        }
        age={age}
      />

      <ProgressStatusSelector
        selected={selectedStatus}
        onSelect={handleStatusChange}
      />
      <ProgressBar progress={progressByStatus[selectedStatus]} />

      <ProjectSwitchButtons
        selected={selectedList}
        onSelect={handleListChange}
      />

      <View className="flex-1 mt-3">
        {selectedList === "projects" ? (
          <ProjectList refreshFlag={projectsRefresh} />
        ) : (
          <>
            <PersonalProjectList
              tasks={personalTasks}
              onItemPress={handleItemPress}
              onDelete={handleDeleteTask}
            />
            <CreateTaskPersonalbtn onTaskCreated={handleCreatePersonalTask} />

            <ModalTaskPersonal
              visible={modalVisible}
              tarea={selectedTask}
              onClose={() => setModalVisible(false)}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          </>
        )}
      </View>

      {selectedList === "projects" && (
        <AddProjectButton onPress={() => setShowCreateModal(true)} />
      )}
      
      <CreateProjectModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateProject}
      />

      <LogoutBtn onLogout={handleLogout} />
    </SafeAreaView>
  );

}