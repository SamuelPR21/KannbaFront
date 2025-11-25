import { ProjectItem } from "../components/profile/types";

export type RootStackParamList = {
    Login: { registered?: boolean } | undefined;
    Register: undefined;
    Tab: undefined;
    ModalInfo: undefined;
    ModalChange: undefined;
    HomeProyecto: undefined;
    HomeTablero: undefined;
    IntoToProyectManger: { project: ProjectItem };
    IntoToProyectColaborador: { project: ProjectItem };
    Profile: undefined

}


export type TabParamList = {
    Home: undefined;
    Profile: undefined;
    Pet: undefined;
  };

export type HomeStackParamList = {
    HomeTablero: undefined;
    HomeProyecto: undefined;
}