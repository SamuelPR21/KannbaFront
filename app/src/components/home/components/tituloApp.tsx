// src/components/home/components/tituloApp.tsx
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title?: string;
}

export default function TituloApp({ title = "MIAU" }: Props) {
  return (
    <View style={styles.wrapper}>
      {/* Card del header (más bajita) */}
      <View style={styles.card}>
        {/* Logo redondo (más pequeño) */}
        <View style={styles.logoCircle}>
          <MaterialCommunityIcons name="cat" size={22} color="#FFFFFF" />
          <View style={styles.miniIconContainer}>
            <MaterialIcons name="view-kanban" size={11} color="#1D4ED8" />
          </View>
        </View>

        {/* Título */}
        <Text style={styles.titleText}>{title}</Text>

        {/* Subtítulo */}
        <Text style={styles.subtitleText}>
          Gestor de tareas y proyectos
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginTop: 4,   // antes 8
    marginBottom: 8, // antes 12
  },
  card: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 18, // antes 24
    paddingVertical: 10,   // antes 16 → mucho más compacta
    borderWidth: 1,
    borderColor: "#DBEAFE",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  logoCircle: {
    width: 44,      // antes 56
    height: 44,     // antes 56
    borderRadius: 22,
    backgroundColor: "#1D4ED8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2, // antes 4
  },
  miniIconContainer: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    padding: 2,  // antes 3
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  titleText: {
    fontSize: 22,   // antes 26
    fontWeight: "800",
    color: "#1D4ED8",
    marginTop: 2,   // antes 4
    letterSpacing: 1,
  },
  subtitleText: {
    fontSize: 11,   // antes 12
    color: "#2563EB",
    marginTop: 2,   // antes 4
    textAlign: "center",
  },
});
