import React from "react";
import { HomeRefreshProvider } from "./src/context/homeRefreshContext";
import { AuthProvider } from "./src/context/userContext";
import RootNavigation from "./src/navigation/rootNavigation";

export default function StartScreen() {
  return (
    <AuthProvider>
      <HomeRefreshProvider>
        <RootNavigation />
      </HomeRefreshProvider>
    </AuthProvider>
  );
}
