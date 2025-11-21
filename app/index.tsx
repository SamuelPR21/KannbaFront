import React from "react";
import { AuthProvider } from "./src/context/userContext";
import RootNavigation from "./src/navigation/rootNavigation";

export default function StartScreen() {
  
  return(
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  )
}