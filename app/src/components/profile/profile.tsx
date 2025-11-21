import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { AuthContext } from "../../context/userContext";
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


  const DUMMY_PROJECTS: ProjectItem[] = Array.from({ length: 8 }, (_, i) => ({
    id: `proj_${i + 1}`,
    title: `Proyecto Asignado ${i + 1}`,
  }));

  const DUMMY_PERSONAL: ProjectItem[] = Array.from({ length: 6 }, (_, i) => ({
    id: `personal_${i + 1}`,
    title: `Tarea Personal ${i + 1}`,
  }));

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

  return (
    <SafeAreaView className="flex-1 bg-white pt-16 px-4">
      <UserInfo
        fullName="Juan Tenorio"
        username="Juan_T32"
        age={66}
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
          <ProjectList projects={DUMMY_PROJECTS} onItemPress={handleProjectPress} />
        ) : (
          <>
            <PersonalProjectList 
              personalProjects={DUMMY_PERSONAL} 
              onItemPress={handleItemPress}
            />
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