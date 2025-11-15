import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import LogoutBtn from "./componets/logoutbtn";
import PersonalProjectList from "./componets/personalProjectList";
import ProgressBar from "./componets/progressbar";
import ProgressStatusSelector from "./componets/progressStatusSelector";
import ProjectList from "./componets/projectList";
import ProjectSwitchButtons from "./componets/projectSwitchButtons";
import UserInfo from "./componets/userInfo";
import { ProjectItem, StatusKey } from "./types";

export default function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedStatus, setSelectedStatus] = React.useState<StatusKey>("backlog");
  const [selectedList, setSelectedList] = React.useState<"projects" | "personal">("projects");
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);

  const progressByStatus: Record<StatusKey, number> = {
    backlog: 18,
    todo: 34,
    doing: 62,
    done: 46,
  };


  const DUMMY_PROJECTS: ProjectItem[] = Array.from({ length: 9 }, (_, i) => ({
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

  const handleLogout = () => {
    navigation.navigate("Login")
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
          <PersonalProjectList personalProjects={DUMMY_PERSONAL} onItemPress={handleProjectPress} />
        )}
      </View>

      <LogoutBtn onLogout={handleLogout} />
    </SafeAreaView>
  );

}