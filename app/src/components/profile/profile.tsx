import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { AuthContext } from "../../context/userContext";
import useAuth from "../../hook/useAuth";
import { RootStackParamList } from "../../navigation/types";
import AddProjectButton from "./componets/addProjectButton";
import CreateProjectModal from "./componets/createProjectModalProps";
import LogoutBtn from "./componets/logoutbtn";
import ProgressBar from "./componets/progressbar";
import ProgressStatusSelector from "./componets/progressStatusSelector";
import ProjectList from "./componets/projectList";
import ProjectSwitchButtons from "./componets/projectSwitchButtons";
import CreateTaskPersonalbtn from "./componets/taskPersonal/createTaskPersonalbtn";
import ModalTaskPersonal from "./componets/taskPersonal/modalTaskPersonal";
import PersonalProjectList from "./componets/taskPersonal/personalProjectList";
import UserInfo from "./componets/userInfo";
import { ProjectItem, StatusKey } from "./types";


export default function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {logout} = useContext(AuthContext);
  const { auth } = useAuth();
  // Para depuración: ver estructura del payload del JWT
  console.log('Auth context in Profile ->', auth);
  
  const [selectedStatus, setSelectedStatus] = React.useState<StatusKey>("backlog");
  const [selectedList, setSelectedList] = React.useState<"projects" | "personal">("projects");
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  const [selectedTask, setSelectedTask] = useState<ProjectItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleItemPress = (tarea: ProjectItem) => {
    setSelectedTask(tarea);
    setModalVisible(true);
  };
  

  const progressByStatus: Record<StatusKey, number> = {
    backlog: 18,
    todo: 34,
    doing: 62,
    done: 46,
  };

  const handleProjectPress = (projectId: string) => {
    setSelectedProjectId(projectId);
    console.log("Selected Project ID:", projectId);
  };

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
    // Aquí puedes enviar los datos a tu API
  };
  
    const updateTask = (updatedTask: ProjectItem) => {
    console.log("Task updated:", updatedTask);
    // Add logic to update the task in your state or backend
  }

  const deleteTask = (taskId: string) => {
    console.log("Task deleted:", taskId);
    // Add logic to delete the task from your state or backend
  }

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
          <ProjectList />
        ) : (
          <>
            <PersonalProjectList/>
            <CreateTaskPersonalbtn />

            <ModalTaskPersonal
              visible={modalVisible}
              tarea={selectedTask}
              onClose={() => setModalVisible(false)}
              onUpdate={updateTask}
              onDelete={deleteTask}
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