// navigation/types.ts
import { ProjectItem } from "../components/profile/types";

export type RootStackParamList = {
  Login: { registered?: boolean } | undefined;
  Register: undefined;
  Tab: undefined;

  // 👇 AHORA ModalInfo también recibe params opcionales
    ModalInfo:
        | {
            taskId: number;
            scope: "personal" | "project";
            proyectId?: number;
            task?: {
                id: number;
                name: string;
                description?: string | null;
                responsibleName?: string | null;
                stateName?: string | null;
            };
            }
        | undefined;

  ModalChange:
    | {
        taskId?: number;
        scope?: "personal" | "project";
        proyectId?: number;
      }
    | undefined;

  HomeProyecto: undefined;
  HomeTablero: undefined;
  IntoToProyectManger: { project: ProjectItem };
  IntoToProyectColaborador: { project: ProjectItem };
  Profile: undefined;
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Pet: undefined;
};

export type HomeStackParamList = {
  HomeTablero: undefined;
  HomeProyecto: undefined;
};
