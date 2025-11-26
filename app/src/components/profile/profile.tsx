import { useContext, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { AuthContext } from "../../context/userContext";
import useAuth from "../../hook/useAuth";
import LogoutBtn from "./componets/logoutbtn";
import ProgressBar from "./componets/progressbar";
import AddProjectButton from "./componets/Projects/addProjectButton";
import CreateProjectModal from "./componets/Projects/createProjectModalProps";
import ProjectList from "./componets/Projects/projectList";
import ProjectSwitchButtons from "./componets/projectSwitchButtons";
import CreateTaskPersonalbtn from "./componets/taskPersonal/createTaskPersonalbtn";
import ModalTaskPersonal from "./componets/taskPersonal/modalTaskPersonal";
import PersonalProjectList from "./componets/taskPersonal/personalProjectList";
import UserInfo from "./componets/userInfo";
import { ProjectItem } from "./types";

export default function Profile() {

  const {logout} = useContext(AuthContext);
  const { auth } = useAuth();
  
  const [selectedList, setSelectedList] = useState<"projects" | "personal">("projects");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectsRefresh, setProjectsRefresh] = useState(0);
  const [selectedTask, setSelectedTask] = useState<ProjectItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleItemPress = (tarea: ProjectItem) => {
    setSelectedTask(tarea);
    setModalVisible(true);
  };

  const handleListChange = (list: "projects" | "personal") => {
    setSelectedList(list)
  }

  const handleLogout = async() => {
    await logout();
  }

  const handleCreateProject = (projectName: string, category: string) => {
    console.log("Nuevo proyecto creado:", projectName, "Categoría:", category);
    setShowCreateModal(false);
    setProjectsRefresh((v) => v + 1);
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

      <ProgressBar/>

      <ProjectSwitchButtons
        selected={selectedList}
        onSelect={handleListChange}
      />

      <View className="flex-1 mt-3">
        {selectedList === "projects" ? (
          <ProjectList refreshFlag={projectsRefresh} />
        ) : (
          <>
            <PersonalProjectList/>
            <CreateTaskPersonalbtn />

            <ModalTaskPersonal
              visible={modalVisible}
              tarea={selectedTask}
              onClose={() => setModalVisible(false)}
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