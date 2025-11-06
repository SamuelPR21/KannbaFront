export type RootStackParamList = {
    Login: { registered?: boolean } | undefined;
    Register: undefined;
    Tab: undefined;
    ModalInfo: undefined;
    ModalChange: undefined;
    HomeProyecto: undefined
    HomeTablero: undefined
  };


export type TabParamList = {
    Home: undefined;
    Profile: undefined;
    Pet: undefined;
  };

export type HomeStackParamList = {
    HomeTablero: undefined;
    HomeProyecto: undefined;
}